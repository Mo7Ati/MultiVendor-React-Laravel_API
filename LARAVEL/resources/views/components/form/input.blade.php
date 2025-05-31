@props(['label', 'value' => '', 'name'])

<label class="form-group"> {{ $label }}</label>
<input type="text" {{ $attributes->class(['is-invalid' => $errors->has($name)])->merge(['class' => 'form-control']) }}
    name="{{ $name }}" value="{{ old($name, $value) }}">

<x-validate-feedback :name="$name" />

{{--  @class(['is-invalid' => $errors->has($name) , 'form-control']) --}}
