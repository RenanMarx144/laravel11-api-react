<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\RespondsWithJson;
use App\Http\Requests\SongRequest;
use App\Models\Song;
use App\Services\SongService;
use Illuminate\Http\Request;

class SongsController extends Controller
{
    //
    use RespondsWithJson;

    public function index(){
        $songs = Song::where('approved' , true)
        ->orderBy('views' , 'DESC')
        ->paginate(10);
        return response()->json($songs);
    }

    public function store(SongRequest $request, SongService $songService)
{
    $song = $songService->createSong($request->validated());

    return response()->json([
        'message' => 'Música cadastrada com sucesso!',
        'data' => $song
    ], 201);
}
    public function approved(Request $request){
        $request->validate([
            'id' => 'required|exists:songs,id',
            'approved' => 'required|boolean'
        ]);

        $song = Song::findOrFail($request->id);
        if(!$song){
            return response()->json([
                'message' => 'Música não encontrada',
                'song' => $song
            ], 404);
        }
        if($request->approved){
            $song->update(['approved' => $request->approved]);
        }else{
            $song->delete();
        }


        return response()->json([
            'message' => 'Música aprovada com sucesso!',
            'song' => $song
        ], 200);
    }

    public function listNewsSongs(){
        $songs = Song::where('approved', false)
            ->oldest('id')
            ->paginate(10);

        return response()->json($songs);
    }

}
