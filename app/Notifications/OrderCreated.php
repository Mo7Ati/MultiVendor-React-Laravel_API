<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderCreated extends Notification
{
     use Queueable;
    public $order;
    /**
     * Create a new notification instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['broadcast', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    public function toDatabase(object $notifiable)
    {
        $addr = $this->order->addresses()->where('type', 'billing')->first();

        return [
            'body' => "New Order #{$this->order->number} Created By  {$addr->name} from {$addr->country} ",
            'icon' => '',
            'url' => 'dashboard.',
            'order_id' => $this->order->id,
        ];
    }

    public function toBroadcast(object $notifiable)
    {
        $addr = $this->order->addresses()->where('type', 'billing')->first();

        return new BroadcastMessage([
            'body' => "New Order #{$this->order->number} Created By  {$addr->name} from {$addr->country} ",
            'icon' => '',
            'url' => 'dashboard.',
            'order_id' => $this->order->id,
        ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {

        return [

        ];
    }
}
