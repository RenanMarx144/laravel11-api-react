<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Sugestão de Música</title>
</head>
<body>
    <h2>Nova Sugestão de Música</h2>
    <p><strong>Nome:</strong> {{ $song->name }}</p>
    <p><strong>Link:</strong> <a href="{{ $song->link }}">{{ $song->link }}</a></p>
    <p>Verifique a nova sugestão e aprove ou rejeite.</p>
</body>
</html>
