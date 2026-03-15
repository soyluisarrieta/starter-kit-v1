<?php

namespace Tests\Feature\Settings\Roles;

use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleUpdateTest extends TestCase
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
        $role = Role::where('name', Roles::ADMIN->value)->first();
        $this->put(route('roles.update', $role))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $role = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAs(User::factory()->create())
            ->put(route('roles.update', $role), [
                'label' => 'Updated',
                'hex_color' => '#FF5733',
            ])
            ->assertForbidden();
    }

    public function test_updates_role(): void
    {
        $role = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAsWithPermission()
            ->from(route('roles.edit'))
            ->put(route('roles.update', $role), [
                'label' => 'Moderador',
                'hex_color' => '#00FF00',
            ])
            ->assertRedirect(route('roles.edit'));

        $this->assertDatabaseHas('roles', [
            'id' => $role->id,
            'label' => 'Moderador',
            'hex_color' => '#00FF00',
        ]);
    }

    public function test_cannot_update_super_admin_role(): void
    {
        $superAdmin = Role::where('name', Roles::SUPER_ADMIN->value)->first();

        $this->actingAsWithPermission()
            ->put(route('roles.update', $superAdmin), [
                'label' => 'Hacked',
                'hex_color' => '#000000',
            ]);

        $this->assertDatabaseHas('roles', [
            'id' => $superAdmin->id,
            'label' => Roles::SUPER_ADMIN->label(),
        ]);
    }

    public function test_validates_required_fields(): void
    {
        $role = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAsWithPermission()
            ->put(route('roles.update', $role), [])
            ->assertSessionHasErrors(['label', 'hex_color']);
    }
}
