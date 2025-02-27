<?php
// app/Services/SongService.php
namespace App\Services;

use App\Models\Song;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewSongSuggestion;

class SongService
{
    public function createSong(array $data): Song
    {
        $song = Song::create($data);
        $this->sendNotification($song);
        return $song;
    }

    protected function sendNotification(Song $song): void
    {
        Mail::to(config('app.admin_email'))->send(new NewSongSuggestion($song));
    }
}
