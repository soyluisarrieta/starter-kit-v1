<?php

it('registration screen can be rendered', function () {
    $this->get(route('register'))->assertOk();
});

it('new users can register', function () {
    $this->post(route('register.store'), [
        'name' => 'Test Name',
        'last_name' => 'Test Last Name',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertRedirect(route('dashboard', absolute: false));

    $this->assertAuthenticated();
});
