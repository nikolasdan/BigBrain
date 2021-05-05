<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use WithFaker;


    /**
     * Test Login & Register
     */
    public function testAuth()
    {
        $data = [
            "name" => $this->faker->sentence,
            "email" => $this->faker->email,
            "password" => $this->faker->password
        ];
        // Register
        $response = $this->postJson('/api/register', $data);
        $response->assertOk();
        $response->assertJson(["status" => "success", "message" => "Success! registration completed"]);
        $response->assertJsonCount(5, $key = "data");

        // Login
        $login = $this->postJson("/api/login", $data);
        $login->assertOk();
        $login->assertJson(["status" => "success", "login" => true]);
    }
}
