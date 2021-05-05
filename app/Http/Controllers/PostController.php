<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Get 10 posts
     * page is declared in `route/to/method/?page=id`
     *@param Request $request
     *@return Post[10]
     */
    public function index(Request $request)
    {
        $posts = Post::Orderby('created_at', 'desc')->select('title', 'content', 'votes')->paginate(10);
        return response()->json($posts);
    }
    /**
     * Create a post
     *  @param Request $request
     *  @return Post
     */
    public function create(Request $request)
    {
        $userId = Auth::id();
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['err' => $validator->errors()], 400);
        }
        $post = new Post();
        $post->title = $request->title;
        $post->user_id = $userId;
        $post->save();
        return response()->json(["status" => "success", "id" => $post->id]);
    }
    /**
     * Show a specific Post
     * @param int $id
     * @return Post
     */
    public function show($id)
    {
        $query = Post::select("title", "content", "votes", "views")->where("id", "=", $id)->first();
        if ($query) {
            $query->views += 1;
            $query->save();
            return response()->json($query);
        }
        return response('', 404);
    }
}
