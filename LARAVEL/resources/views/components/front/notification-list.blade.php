<li class="nav-item dropdown">
    <a class="nav-link" data-toggle="dropdown" href="#">
        <i class="far fa-bell"></i>
        <span class="badge badge-warning navbar-badge">{{ $newCount }}</span>
    </a>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span class="dropdown-header">{{ $newCount }} notifications</span>
        @foreach ($notifications as $notification)
            <div class="dropdown-divider "></div>
            <a href="{{ route($notification->data['url'], ['notification_id' => $notification->id]) }}"
                class="dropdown-item
                @if ($notification->unread()) text-bold @endif">
                <i class="fas
                fa-envelope mr-2"></i> {{ Str::words($notification->data['body'], 5) }}
                <span
                    class="float-right text-muted text-sm">{{ $notification->created_at->shortAbsoluteDiffForHumans() }}</span>
            </a>
        @endforeach
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
    </div>
</li>
