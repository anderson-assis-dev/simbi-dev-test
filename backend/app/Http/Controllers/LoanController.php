<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    public function index()
    {
        return Loan::with(['book', 'author'])->get();
    }

    public function store(Request $request)
    {
        $loan = Loan::create($request->all());
        return response()->json($loan, 201);
    }

    public function show($id)
    {
        return Loan::with(['book', 'author'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $loan = Loan::findOrFail($id);
        $loan->update($request->all());
        return response()->json($loan, 200);
    }

    public function destroy($id)
    {
        Loan::find($id)->delete();
        return response()->json(null, 204);
    }
}
