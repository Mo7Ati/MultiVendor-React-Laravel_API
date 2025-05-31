@props(['name', 'label', 'selected', 'options', 'firstValue', 'firstItem'])

<label class="form-group">{{ $label }} </label>
<select name="{{ $name }}"
    {{ $attributes->class(['is-invalid' => $errors->has($name)])->merge(['class' => 'form-control']) }}>
    <option value="{{ $firstValue }}">{{ $firstItem }}</option>
    @foreach ($options as $key => $value)
        <option value="{{ $value->id }}" @selected(old($name, $selected) == $value->id)>{{ $value->name }}</option>
    @endforeach
</select>
<x-validate-feedback :name="$name" />
