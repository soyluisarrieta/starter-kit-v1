<?php

namespace Tests\Feature\Settings\Roles;

use App\Enums\Permissions;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleStoreTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->seed(RoleSeeder::class);
    }

    private function actingAsWithPermission(): static
    {
        $user = User::factory()->create();
        $user->givePermissionTo(Permissions::MANAGE_ROLES->value);

        return $this->actingAs($user);
    }

    public function test_guests_redirected_to_login(): void
    {
        $this->post(route('roles.store'))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $this->actingAs(User::factory()->create())
            ->post(route('roles.store'), [
                'label' => 'Editor',
                'hex_color' => '#FF5733',
            ])
            ->assertForbidden();
    }

    public function test_creates_role_with_slug_name(): void
    {
        $this->actingAsWithPermission()
            ->from(route('roles.edit'))
            ->post(route('roles.store'), [
                'label' => 'Content Editor',
                'hex_color' => '#FF5733',
            ])
            ->assertRedirect(route('roles.edit'));

        $this->assertDatabaseHas('roles', [
            'label' => 'Content Editor',
            'name' => Str::slug('Content Editor'),
            'hex_color' => '#FF5733',
        ]);
    }

    public function test_validates_required_fields(): void
    {
        $this->actingAsWithPermission()
            ->post(route('roles.store'), [])
            ->assertSessionHasErrors(['label', 'hex_color']);
    }

    public function test_validates_unique_label(): void
    {
        Role::create(['name' => 'editor', 'label' => 'Editor', 'hex_color' => '#000000']);

        $this->actingAsWithPermission()
            ->post(route('roles.store'), [
                'label' => 'Editor',
                'hex_color' => '#FF5733',
            ])
            ->assertSessionHasErrors('label');
    }

    public function test_validates_hex_color_format(): void
    {
        $this->actingAsWithPermission()
            ->post(route('roles.store'), [
                'label' => 'Editor',
                'hex_color' => 'not-a-color',
            ])
            ->assertSessionHasErrors('hex_color');
    }
}
