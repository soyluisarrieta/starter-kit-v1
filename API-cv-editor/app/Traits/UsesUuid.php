<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait UsesUuid
{
    /**
     * Boot the uses uuid trait for a model.
     *
     * @return void
     */
    protected static function bootUsesUuid()
    {
        static::creating(function ($model) {
            if (! $model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });

        static::retrieved(function ($model) {
            $model->incrementing = false;
        });
    }

    /**
     * Initialize the uses uuid trait for an instance.
     *
     * @return void
     */
    public function initializeUsesUuid()
    {
        $this->incrementing = false;
        $this->keyType = 'string';
    }
}