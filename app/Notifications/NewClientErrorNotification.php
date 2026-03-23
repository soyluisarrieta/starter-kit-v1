<?php

namespace App\Notifications;

use App\Models\ClientError;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewClientErrorNotification extends Notification
{
    use Queueable;

    public function __construct(
        public ClientError $clientError,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $user = $this->clientError->user;
        $userLabel = $user ? "{$user->name} ({$user->email})" : 'Guest';

        return (new MailMessage)
            ->subject("[Error] {$this->clientError->message}")
            ->line("**URL:** {$this->clientError->url}")
            ->line("**User:** {$userLabel}")
            ->line('**Stack trace:**')
            ->line("```\n{$this->clientError->stack}\n```");
    }
}
