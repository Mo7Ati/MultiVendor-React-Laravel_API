<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProductsRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Throwable;

class ProductController extends Controller
{

    public function index()
    {
        Gate::authorize('view products');
        $products = Product::with('Category:name,id', 'Store:name,id')->get();
        return [
            'products' => $products,
            'total_products' => Product::all()->count(),
        ];
    }
    public function create()
    {
        // Gate::authorize('create products');

        // $product = new Product();
        // $categories = Category::all();
        // $stores = Store::all();
        // $tags = Tag::all();

        // return [
        //     'product' => $product,
        //     'categories' => $categories,
        //     'stores' => $stores,
        //     'tags' => $tags,
        // ];
    }

    public function store(ProductsRequest $request)
    {
        Gate::authorize('create products');

        $data = $request->except(['image', 'tags']);

        $data['image'] = $this->storeImage($request);

        $product = Product::create($data);

        if ($request->has('tags')) {
            $this->storeTags($request->post('tags'), $product);
        }

        return $product;//->load('category', 'store');
    }


    public function show(string $id)
    {
        //
    }

    public function edit(Product $product)
    {
        // Gate::authorize('update products');

        // $categories = Category::all();
        // $stores = Store::all();
        // $tags = Tag::all();


        //     [
        //         'product' => $product,
        //         'categories' => $categories,
        //         'stores' => $stores,
        //         'tags' => $tags,
        //     ]
        // )
        // ;
    }


    public function update(ProductsRequest $request, Product $product)
    {
        Gate::authorize('update products');

        $data = $request->except('image', 'tags');

        $data['image'] = $this->storeImage($request, $product);

        $this->updateTags($request->post('tags'), $product);

        $product->update($data);

        return $product;
    }


    public function destroy(Product $product)
    {
        Gate::authorize('delete products');

        $this->deleteOldImage($product);
        $product->delete();
    }

    public function storeImage(ProductsRequest $request, Product $product = null)
    {
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            if ($product) {
                $this->deleteOldImage($product);
            }
            return $request->file('image')->store('uploads/products', 'public');
        } else if ($product && $product->image && filter_var($request->post('removeImage'), FILTER_VALIDATE_BOOLEAN)) {
            $this->deleteOldImage($product);
            return null;
        } else {
            return $product->image ?? null;
        }

    }

    public function deleteOldImage(Product $product)
    {
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }
    }

    public function storeTags($tags, $product)
    {
        DB::beginTransaction();
        try {
            foreach ($tags as $key => $tag_name) {
                $slug = Str::slug($tag_name);
                $tag = Tag::where('slug', $slug)->first();
                if (!$tag) {
                    $tag = Tag::create([
                        'name' => $tag_name,
                        'slug' => $slug,
                    ]);
                }
                $tag->products()->attach($product->id);
            }
            Db::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function updateTags($tags, Product $product)
    {
        if (!$tags) {
            ($product->tags()->count() > 0) && $product->tags()->detach();
            return;
        }

        try {
            DB::beginTransaction();
            $ids = [];
            foreach ($tags as $key => $tag_name) {
                $tag = Tag::where('name', $tag_name)->first();
                if (!$tag) {
                    $tag = Tag::create(
                        [
                            'name' => $tag_name,
                            'slug' => Str::slug($tag_name),
                        ]
                    );
                }
                $ids[] = $tag->id;
            }
            $product->tags()->sync($ids);

            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

}
