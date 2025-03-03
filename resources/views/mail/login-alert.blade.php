<x-mail::message>
    # ¡Has iniciado de sesión!

    Hola {{ $user->name }},

    Te informamos que a las {{ now()->format('H:i:s') }} ingresaste a {{ config('app.name') }}.

    Si no fuiste tú, por favor comunicate con un administrador vía WhatsApp o llamada al +573205067634, también puedes ingresar al siguiente enlace:

    https://api.whatsapp.com/send?phone=573205067634
</x-mail::message>