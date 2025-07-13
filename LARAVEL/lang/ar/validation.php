<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'يجب قبول :attribute.',
    'accepted_if' => 'يجب قبول :attribute عندما يكون :other هو :value.',
    'active_url' => 'يجب أن يكون :attribute رابط صحيح.',
    'after' => 'يجب أن يكون :attribute تاريخ بعد :date.',
    'after_or_equal' => 'يجب أن يكون :attribute تاريخ بعد أو يساوي :date.',
    'alpha' => 'يجب أن يحتوي :attribute على أحرف فقط.',
    'alpha_dash' => 'يجب أن يحتوي :attribute على أحرف وأرقام وشرطات وشرطات سفلية فقط.',
    'alpha_num' => 'يجب أن يحتوي :attribute على أحرف وأرقام فقط.',
    'any_of' => 'حقل :attribute غير صحيح.',
    'array' => 'يجب أن يكون :attribute مصفوفة.',
    'ascii' => 'يجب أن يحتوي :attribute على أحرف وأرقام ورموز أحادية البايت فقط.',
    'before' => 'يجب أن يكون :attribute تاريخ قبل :date.',
    'before_or_equal' => 'يجب أن يكون :attribute تاريخ قبل أو يساوي :date.',
    'between' => [
        'array' => 'يجب أن يحتوي :attribute على :min إلى :max عنصر.',
        'file' => 'يجب أن يكون حجم :attribute بين :min و :max كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة :attribute بين :min و :max.',
        'string' => 'يجب أن يكون طول :attribute بين :min و :max حرف.',
    ],
    'boolean' => 'يجب أن تكون قيمة :attribute صحيحة أو خاطئة.',
    'can' => 'يحتوي :attribute على قيمة غير مصرح بها.',
    'confirmed' => 'تأكيد :attribute غير متطابق.',
    'contains' => 'حقل :attribute يفتقد إلى قيمة مطلوبة.',
    'current_password' => 'كلمة المرور غير صحيحة.',
    'date' => 'يجب أن يكون :attribute تاريخ صحيح.',
    'date_equals' => 'يجب أن يكون :attribute تاريخ يساوي :date.',
    'date_format' => 'يجب أن يتطابق :attribute مع الصيغة :format.',
    'decimal' => 'يجب أن يحتوي :attribute على :decimal منازل عشرية.',
    'declined' => 'يجب رفض :attribute.',
    'declined_if' => 'يجب رفض :attribute عندما يكون :other هو :value.',
    'different' => 'يجب أن يكون :attribute و :other مختلفين.',
    'digits' => 'يجب أن يكون :attribute :digits أرقام.',
    'digits_between' => 'يجب أن يكون :attribute بين :min و :max أرقام.',
    'dimensions' => 'أبعاد الصورة في :attribute غير صحيحة.',
    'distinct' => 'يحتوي :attribute على قيمة مكررة.',
    'doesnt_end_with' => 'يجب ألا ينتهي :attribute بأحد القيم التالية: :values.',
    'doesnt_start_with' => 'يجب ألا يبدأ :attribute بأحد القيم التالية: :values.',
    'email' => 'يجب أن يكون :attribute عنوان بريد إلكتروني صحيح.',
    'ends_with' => 'يجب أن ينتهي :attribute بأحد القيم التالية: :values.',
    'enum' => 'القيمة المحددة لـ :attribute غير صحيحة.',
    'exists' => 'القيمة المحددة لـ :attribute غير صحيحة.',
    'extensions' => 'يجب أن يكون لـ :attribute أحد الامتدادات التالية: :values.',
    'file' => 'يجب أن يكون :attribute ملف.',
    'filled' => 'يجب أن يحتوي :attribute على قيمة.',
    'gt' => [
        'array' => 'يجب أن يحتوي :attribute على أكثر من :value عنصر.',
        'file' => 'يجب أن يكون حجم :attribute أكبر من :value كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة :attribute أكبر من :value.',
        'string' => 'يجب أن يكون طول :attribute أكبر من :value حرف.',
    ],
    'gte' => [
        'array' => 'يجب أن يحتوي :attribute على :value عنصر أو أكثر.',
        'file' => 'يجب أن يكون حجم :attribute أكبر من أو يساوي :value كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة :attribute أكبر من أو تساوي :value.',
        'string' => 'يجب أن يكون طول :attribute أكبر من أو يساوي :value حرف.',
    ],
    'hex_color' => 'يجب أن يكون :attribute لون ست عشري صحيح.',
    'image' => 'يجب أن يكون :attribute صورة.',
    'in' => 'القيمة المحددة لـ :attribute غير صحيحة.',
    'in_array' => 'يجب أن يوجد :attribute في :other.',
    'integer' => 'يجب أن يكون :attribute رقم صحيح.',
    'ip' => 'يجب أن يكون :attribute عنوان IP صحيح.',
    'ipv4' => 'يجب أن يكون :attribute عنوان IPv4 صحيح.',
    'ipv6' => 'يجب أن يكون :attribute عنوان IPv6 صحيح.',
    'json' => 'يجب أن يكون :attribute نص JSON صحيح.',
    'list' => 'يجب أن يكون :attribute قائمة.',
    'lowercase' => 'يجب أن يكون :attribute بأحرف صغيرة.',
    'lt' => [
        'array' => 'يجب أن يحتوي :attribute على أقل من :value عنصر.',
        'file' => 'يجب أن يكون حجم :attribute أقل من :value كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة :attribute أقل من :value.',
        'string' => 'يجب أن يكون طول :attribute أقل من :value حرف.',
    ],
    'lte' => [
        'array' => 'يجب ألا يحتوي :attribute على أكثر من :value عنصر.',
        'file' => 'يجب أن يكون حجم :attribute أقل من أو يساوي :value كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة :attribute أقل من أو تساوي :value.',
        'string' => 'يجب أن يكون طول :attribute أقل من أو يساوي :value حرف.',
    ],
    'mac_address' => 'يجب أن يكون :attribute عنوان MAC صحيح.',
    'max' => [
        'array' => 'يجب ألا يحتوي :attribute على أكثر من :max عنصر.',
        'file' => 'يجب ألا يكون حجم :attribute أكبر من :max كيلوبايت.',
        'numeric' => 'يجب ألا تكون قيمة :attribute أكبر من :max.',
        'string' => 'يجب ألا يكون طول :attribute أكبر من :max حرف.',
    ],
    'max_digits' => 'يجب ألا يحتوي :attribute على أكثر من :max أرقام.',
    'mimes' => 'يجب أن يكون :attribute ملف من نوع: :values.',
    'mimetypes' => 'يجب أن يكون :attribute ملف من نوع: :values.',
    'min' => [
        'array' => 'يجب أن يحتوي :attribute على :min عنصر على الأقل.',
        'file' => 'يجب أن يكون حجم :attribute :min كيلوبايت على الأقل.',
        'numeric' => 'يجب أن تكون قيمة :attribute :min على الأقل.',
        'string' => 'يجب أن يكون طول :attribute :min حرف على الأقل.',
    ],
    'min_digits' => 'يجب أن يحتوي :attribute على :min أرقام على الأقل.',
    'missing' => 'يجب أن يكون :attribute مفقود.',
    'missing_if' => 'يجب أن يكون :attribute مفقود عندما يكون :other هو :value.',
    'missing_unless' => 'يجب أن يكون :attribute مفقود ما لم يكن :other هو :value.',
    'missing_with' => 'يجب أن يكون :attribute مفقود عندما يكون :values موجود.',
    'missing_with_all' => 'يجب أن يكون :attribute مفقود عندما تكون :values موجودة.',
    'multiple_of' => 'يجب أن تكون قيمة :attribute مضاعف لـ :value.',
    'not_in' => 'القيمة المحددة لـ :attribute غير صحيحة.',
    'not_regex' => 'صيغة :attribute غير صحيحة.',
    'numeric' => 'يجب أن تكون قيمة :attribute رقم.',
    'password' => [
        'letters' => 'يجب أن يحتوي :attribute على حرف واحد على الأقل.',
        'mixed' => 'يجب أن يحتوي :attribute على حرف كبير وحرف صغير على الأقل.',
        'numbers' => 'يجب أن يحتوي :attribute على رقم واحد على الأقل.',
        'symbols' => 'يجب أن يحتوي :attribute على رمز واحد على الأقل.',
        'uncompromised' => 'كلمة المرور المحددة ظهرت في تسريب بيانات. يرجى اختيار كلمة مرور مختلفة.',
    ],
    'present' => 'يجب أن يكون :attribute موجود.',
    'present_if' => 'يجب أن يكون :attribute موجود عندما يكون :other هو :value.',
    'present_unless' => 'يجب أن يكون :attribute موجود ما لم يكن :other هو :value.',
    'present_with' => 'يجب أن يكون :attribute موجود عندما يكون :values موجود.',
    'present_with_all' => 'يجب أن يكون :attribute موجود عندما تكون :values موجودة.',
    'prohibited' => 'حقل :attribute محظور.',
    'prohibited_if' => 'حقل :attribute محظور عندما يكون :other هو :value.',
    'prohibited_if_accepted' => 'حقل :attribute محظور عندما يكون :other مقبول.',
    'prohibited_if_declined' => 'حقل :attribute محظور عندما يكون :other مرفوض.',
    'prohibited_unless' => 'حقل :attribute محظور ما لم يكن :other في :values.',
    'prohibits' => 'حقل :attribute يمنع :other من الوجود.',
    'regex' => 'صيغة :attribute غير صحيحة.',
    'required' => 'حقل :attribute مطلوب.',
    'required_array_keys' => 'يجب أن يحتوي حقل :attribute على مدخلات لـ: :values.',
    'required_if' => 'حقل :attribute مطلوب عندما يكون :other هو :value.',
    'required_if_accepted' => 'حقل :attribute مطلوب عندما يكون :other مقبول.',
    'required_if_declined' => 'حقل :attribute مطلوب عندما يكون :other مرفوض.',
    'required_unless' => 'حقل :attribute مطلوب ما لم يكن :other في :values.',
    'required_with' => 'حقل :attribute مطلوب عندما يكون :values موجود.',
    'required_with_all' => 'حقل :attribute مطلوب عندما تكون :values موجودة.',
    'required_without' => 'حقل :attribute مطلوب عندما لا يكون :values موجود.',
    'required_without_all' => 'حقل :attribute مطلوب عندما لا تكون أي من :values موجودة.',
    'same' => 'يجب أن يتطابق :attribute مع :other.',
    'size' => [
        'array' => 'يجب أن يحتوي :attribute على :size عنصر.',
        'file' => 'يجب أن يكون حجم :attribute :size كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة :attribute :size.',
        'string' => 'يجب أن يكون طول :attribute :size حرف.',
    ],
    'starts_with' => 'يجب أن يبدأ :attribute بأحد القيم التالية: :values.',
    'string' => 'يجب أن يكون :attribute نص.',
    'timezone' => 'يجب أن يكون :attribute منطقة زمنية صحيحة.',
    'unique' => 'تم أخذ :attribute بالفعل.',
    'uploaded' => 'فشل رفع :attribute.',
    'uppercase' => 'يجب أن يكون :attribute بأحرف كبيرة.',
    'url' => 'يجب أن يكون :attribute رابط صحيح.',
    'ulid' => 'يجب أن يكون :attribute ULID صحيح.',
    'uuid' => 'يجب أن يكون :attribute UUID صحيح.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'name.en.required' => 'اسم المتجر باللغة الإنجليزية مطلوب.',
        'name.ar.required' => 'اسم المتجر باللغة العربية مطلوب.',
        'name.*.max' => 'اسم المتجر يجب ألا يتجاوز 255 حرف.',
        'address.en.required' => 'عنوان المتجر باللغة الإنجليزية مطلوب.',
        'address.ar.required' => 'عنوان المتجر باللغة العربية مطلوب.',
        'address.*.max' => 'عنوان المتجر يجب ألا يتجاوز 255 حرف.',
        'email.required' => 'عنوان البريد الإلكتروني مطلوب.',
        'email.email' => 'يجب أن يكون عنوان البريد الإلكتروني صحيح.',
        'email.unique' => 'عنوان البريد الإلكتروني مستخدم بالفعل.',
        'phone.required' => 'رقم الهاتف مطلوب.',
        'phone.unique' => 'رقم الهاتف مستخدم بالفعل.',
        'password.required' => 'كلمة المرور مطلوبة.',
        'password.min' => 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.',
        'delivery_time.required' => 'وقت التوصيل مطلوب.',
        'delivery_time.numeric' => 'وقت التوصيل يجب أن يكون رقم.',
        'media.logo.required' => 'شعار المتجر مطلوب.',
        'social_media.*.platform.required' => 'كل منصة وسائل التواصل الاجتماعي يجب أن تحتوي على منصة.',
        'social_media.*.url.required' => 'كل منصة وسائل التواصل الاجتماعي يجب أن تحتوي على رابط صحيح.',
        'social_media.*.url.url' => 'رابط وسائل التواصل الاجتماعي يجب أن يكون صحيح.',
        'name.required' => 'يجب إدخال اسم الفئة.',
        'status.required' => 'يجب تحديد حالة الفئة.',
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'name' => 'الاسم',
        'email' => 'البريد الإلكتروني',
        'phone' => 'رقم الهاتف',
        'password' => 'كلمة المرور',
        'address' => 'العنوان',
        'description' => 'الوصف',
        'keywords' => 'الكلمات المفتاحية',
        'delivery_time' => 'وقت التوصيل',
        'logo' => 'الشعار',
        'gallery' => 'المعرض',
        'social_media' => 'وسائل التواصل الاجتماعي',
        'platform' => 'المنصة',
        'url' => 'الرابط',
        'is_active' => 'نشط',
        'rate' => 'التقييم',
    ],

];
