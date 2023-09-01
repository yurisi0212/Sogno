<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Session;

class DreamStoreRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array {
        return [
            'title' => ['required', 'string', 'min:3', 'max:30'],
            'content' => ['required', 'max:2000'],
        ];
    }

    protected function failedValidation(Validator $validator) {
        Session::flash("message_error", "投稿できませんでした。しばらく待ってから投稿してみてください。");
        parent::failedValidation($validator);
    }

}
