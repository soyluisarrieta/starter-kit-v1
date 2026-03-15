<?php

namespace Tests\Feature\Users;

use App\Enums\Permissions;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserIndexTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->seed(RoleSeeder::class);
    }

    public function test_guests_redirected_to_login(): void
    {
        $this->get(route('users'))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('users'))
            ->assertForbidden();
    }

    public function test_with_permission_returns_ok(): void
    {
        $user = User::factory()->create();
        $user->givePermissionTo(Permissions::LIST_USERS->value);

        $this->actingAs($user)
            ->get(route('users'))
            ->assertOk();
    }

    public function test_json_returns_created_users_in_data(): void
    {
        $users = User::factory()->count(3)->create();

        $actor = User::factory()->create();
        $actor->givePermissionTo(Permissions::LIST_USERS->value);

        $response = $this->actingAs($actor)
            ->getJson(route('users'))
            ->assertOk()
            ->assertJsonStructure(['data', 'current_page', 'per_page', 'total']);

        $returnedEmails = collect($response->json('data'))->pluck('email');

        foreach ($users as $user) {
            $this->assertTrue($returnedEmails->contains($user->email));
        }
    }

    public function test_json_paginates_results(): void
    {
        User::factory()->count(15)->create();

        $actor = User::factory()->create();
        $actor->givePermissionTo(Permissions::LIST_USERS->value);

        $response = $this->actingAs($actor)
            ->getJson(route('users', ['perPage' => 10]))
            ->assertOk();

        // 16 total users (15 + actor), perPage 10 → first page has 10
        $this->assertCount(10, $response->json('data'));
        $this->assertEquals(16, $response->json('total'));
    }
}
