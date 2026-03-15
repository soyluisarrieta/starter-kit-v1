<?php

namespace Tests\Feature\ClientErrors;

use App\Models\User;
use App\Notifications\FrequentClientErrorNotification;
use App\Notifications\NewClientErrorNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ClientErrorNotificationTest extends TestCase
{
    use RefreshDatabase;

    private function validPayload(array $overrides = []): array
    {
        return [
            'message' => 'Cannot read properties of undefined',
            'stack' => "Error: Cannot read properties of undefined\n    at UserList (http://localhost/assets/app.js:142:15)",
            'component_stack' => "\n    at UserList\n    at Dashboard",
            'url' => 'http://localhost/dashboard',
            ...$overrides,
        ];
    }

    protected function setUp(): void
    {
        parent::setUp();

        Config::set('errors.notify_email', 'admin@example.com');
        Config::set('errors.frequent_threshold', 10);
    }

    public function test_new_error_sends_notification(): void
    {
        Notification::fake();

        $this->postJson(route('client-errors.store'), $this->validPayload())
            ->assertNoContent();

        Notification::assertSentOnDemand(NewClientErrorNotification::class);
    }

    public function test_duplicate_error_does_not_send_new_notification(): void
    {
        Notification::fake();

        $payload = $this->validPayload();

        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

        Notification::assertSentOnDemandTimes(NewClientErrorNotification::class, 1);
    }

    public function test_frequent_error_sends_notification_at_threshold(): void
    {
        Notification::fake();

        Config::set('errors.frequent_threshold', 3);

        $payload = $this->validPayload();

        // Occurrences 1, 2, 3
        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

        Notification::assertSentOnDemand(FrequentClientErrorNotification::class);
    }

    public function test_frequent_notification_sent_only_once(): void
    {
        Notification::fake();

        Config::set('errors.frequent_threshold', 3);

        $payload = $this->validPayload();

        // Occurrences 1 through 5
        for ($i = 0; $i < 5; $i++) {
            $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
        }

        Notification::assertSentOnDemandTimes(FrequentClientErrorNotification::class, 1);
    }

    public function test_no_notification_when_email_not_configured(): void
    {
        Notification::fake();

        Config::set('errors.notify_email', null);

        $this->postJson(route('client-errors.store'), $this->validPayload())
            ->assertNoContent();

        Notification::assertNothingSent();
    }

    public function test_new_error_notification_contains_error_details(): void
    {
        Notification::fake();

        $user = User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);

        $this->actingAs($user)
            ->postJson(route('client-errors.store'), $this->validPayload())
            ->assertNoContent();

        Notification::assertSentOnDemand(
            NewClientErrorNotification::class,
            function (NewClientErrorNotification $notification, array $channels, object $notifiable) {
                $mail = $notification->toMail($notifiable);

                $this->assertStringContainsString('Cannot read properties of undefined', $mail->subject);
                $this->assertEquals('admin@example.com', $notifiable->routes['mail']);

                return true;
            }
        );
    }

    public function test_frequent_notification_includes_occurrences(): void
    {
        Notification::fake();

        Config::set('errors.frequent_threshold', 2);

        $payload = $this->validPayload();

        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

        Notification::assertSentOnDemand(
            FrequentClientErrorNotification::class,
            function (FrequentClientErrorNotification $notification, array $channels, object $notifiable) {
                $mail = $notification->toMail($notifiable);

                $this->assertStringContainsString('x2', $mail->subject);

                return true;
            }
        );
    }
}
