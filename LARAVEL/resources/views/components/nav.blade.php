<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
    @foreach ($items as $key => $value)
        <li class="nav-item menu-open">
            <a href="{{ route($value['Route']) }}"
                class=
            " nav-link
               {{ Route::is($value['active']) ? 'active' : '' }}

            ">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                    {{ $value['title'] }}
                </p>
            </a>
        </li>
    @endforeach
</ul>
