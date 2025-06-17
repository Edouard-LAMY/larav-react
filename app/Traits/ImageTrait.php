<?php

namespace App\Traits;


trait ImageTrait
{
     /**
     * Return the resolution of an Image
     */
    public function resolution(string $format): string
    {
        return '/storage/images/'.$format.'/'.$this->originalFile;
    }

    /**
     * Add a format to an Image
     */
    public static function generateRandomString(int $length = 10): string
    {
        $characters       = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString     = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }

    /**
     * Return the Image's name
     */
    public static function formatImageName(string $name): string
    {
        $realNameNoExt = str_replace('public/', '', $name);
        $realNameNoExt = str_replace('images/', '', $name);
        $realNameNoExt = str_replace('.jpg', '', $realNameNoExt);
        $realNameNoExt = str_replace(' ', '_', $realNameNoExt);
        $realNameNoExt = str_replace('.jpeg', '', $realNameNoExt);
        $realNameNoExt = str_replace('.JPG', '', $realNameNoExt);
        $realNameNoExt = str_replace('.JPEG', '', $realNameNoExt);
        $realNameNoExt = str_replace('.png', '', $realNameNoExt);
        $realNameNoExt = str_replace('.PNG', '', $realNameNoExt);
        $realNameNoExt = str_replace('.gif', '', $realNameNoExt);
        $realNameNoExt = str_replace('.GIF', '', $realNameNoExt);

        return $realNameNoExt;
    }
}
