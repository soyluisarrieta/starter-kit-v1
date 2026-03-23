<?php

use App\Models\User;
use App\Notifications\FrequentClientErrorNotification;
use App\Notifications\NewClientErrorNotification;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Notification;

function clientErrorNotificationPayload(array $overrides = []): array
{
    return [
        'message' => 'Cannot read properties of undefined',
        'stack' => "Error: Cannot read properties of undefined\n    at UserList (http://localhost/assets/app.js:142:15)",
        'component_stack' => "\n    at UserList\n    at Dashboard",
        'url' => 'http://localhost/dashboard',
        ...$overrides,
    ];
}

beforeEach(function () {
    Config::set('errors.notify_email', 'admin@example.com');
    Config::set('errors.frequent_threshold', 10);
});

it('new error sends notification', function () {
    Notification::fake();

    $this->postJson(route('client-errors.store'), clientErrorNotificationPayload())
        ->assertNoContent();

    Notification::assertSentOnDemand(NewClientErrorNotification::class);
});

it('duplicate error does not send new notification', function () {
    Notification::fake();

    $payload = clientErrorNotificationPayload();

    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

    Notification::assertSentOnDemandTimes(NewClientErrorNotification::class, 1);
});

it('frequent error sends notification at threshold', function () {
    Notification::fake();

    Config::set('errors.frequent_threshold', 3);

    $payload = clientErrorNotificationPayload();

    // Occurrences 1, 2, 3
    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

    Notification::assertSentOnDemand(FrequentClientErrorNotification::class);
});

it('frequent notification sent only once', function () {
    Notification::fake();

    Config::set('errors.frequent_threshold', 3);

    $payload = clientErrorNotificationPayload();

    // Occurrences 1 through 5
    for ($i = 0; $i < 5; $i++) {
        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
    }

    Notification::assertSentOnDemandTimes(FrequentClientErrorNotification::class, 1);
});

it('no notification when email not configured', function () {
    Notification::fake();

    Config::set('errors.notify_email', null);

    $this->postJson(route('client-errors.store'), clientErrorNotificationPayload())
        ->assertNoContent();

    Notification::assertNothingSent();
});

it('new error notification contains error details', function () {
    Notification::fake();

    $user = User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);

    $this->actingAs($user)
        ->postJson(route('client-errors.store'), clientErrorNotificationPayload())
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
});

it('frequent notification includes occurrences', function () {
    Notification::fake();

    Config::set('errors.frequent_threshold', 2);

    $payload = clientErrorNotificationPayload();

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
});
