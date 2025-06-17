<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sliders', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle');
            $table->string('message')->nullable();
            $table->string('title_color', 7)->nullable();
            $table->string('subtitle_color', 7)->nullable();
            $table->string('background_color', 7)->nullable();
            $table->string('text_button');
            $table->enum('button_style', ['dark', 'light', 'standard', 'warning'])->default('standard');
            $table->string('button_link');
            $table->foreignId('image_id')->nullable()->constrained('images');
            $table->boolean('is_active')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sliders');
    }
};
