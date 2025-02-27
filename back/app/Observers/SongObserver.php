<?php

namespace App\Observers;

use App\Mail\NewSongSuggestion;
use App\Models\Song;
use Illuminate\Support\Facades\Mail;

class SongObserver
{
    /**
     * Handle the Song "created" event.
     */
    public function created(Song $song): void
    {
        //
        Mail::to(config('app.admin_email'))
        ->send(new NewSongSuggestion($song));
    }

    /**
     * Handle the Song "updated" event.
     */
    public function updated(Song $song): void
    {
        //
    }

    /**
     * Handle the Song "deleted" event.
     */
    public function deleted(Song $song): void
    {
        //
    }

    /**
     * Handle the Song "restored" event.
     */
    public function restored(Song $song): void
    {
        //
    }

    /**
     * Handle the Song "force deleted" event.
     */
    public function forceDeleted(Song $song): void
    {
        //
    }
}
