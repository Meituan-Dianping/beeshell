package com.beeshell.imagepicker;

import android.app.Activity;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.provider.MediaStore;

//import com.meituan.beeRN.common.LxReportField;
//import com.meituan.beeRN.util.LxReportUtil;
//import com.meituan.beeRN.util.MfeLog;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by gengyuanbo on 17/7/19.
 * Desc:
 */
public class ImageCompressUtil {

    public static Uri comPressImg(Activity activity, File file, Uri imgUri, int width, int height, int quality) {
        if (activity == null || imgUri == null) {
//            MfeLog.i("ImagePickerManagerModule: compressPhoto activity or imgUri is null");
            return null;
        }
        if (width <= 0 || height <= 0 || quality <= 0){
//            MfeLog.i("ImagePickerManagerModule: compressPhoto" + String.format("width=%d, height=%d, quality=%d", width, height, quality));
            return null;
        }
        if (file == null || !file.exists()) {
//            MfeLog.i("ImagePickerManagerModule: compressPhoto file is null");
            return null;
        }
        Bitmap photo = null;
        try {
            String realPath = getRealPathFromURI(activity, imgUri);
//            MfeLog.i("comPressImg realPath " + realPath);
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
            BitmapFactory.decodeFile(realPath, options);
            options.inPreferredConfig = Bitmap.Config.RGB_565;
            options.inSampleSize = calculateInSampleSize(options, width, height);
            options.inJustDecodeBounds = false;
            photo = BitmapFactory.decodeFile(realPath,options);
        } catch (Exception e) {
//            LxReportUtil.reportEvent(null , LxReportField.IMAGE_PICKER_MODULE_COMPRESS_PHOTO_ERROR, null);
//            MfeLog.catchException(e);
        }

        if (null == photo) {
//            MfeLog.i("ImagePickerManagerModule: compressPhoto photo is null");
            return null;
        }
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(file);
            photo.compress(Bitmap.CompressFormat.JPEG, quality, fos);
        } catch (FileNotFoundException e) {
//            MfeLog.catchException(e);
        } finally {
            photo.recycle();
            photo = null;
            try {
                if (fos != null){
                    fos.flush();
                    fos.close();
                }
            } catch (IOException e) {
//                MfeLog.catchException(e);
            }
        }
        Uri uri = Uri.fromFile(file);
        return uri;
    }

    public static String getRealPathFromURI(Activity activity, Uri uri) {
        String result;
        String[] projection = {MediaStore.Images.Media.DATA};
        Cursor cursor = activity.getContentResolver().query(uri, projection, null, null, null);
        if (cursor == null) { // Source is Dropbox or other similar local file path
            result = uri.getPath();
        } else {
            cursor.moveToFirst();
            int idx = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            result = cursor.getString(idx);
            cursor.close();
        }
//        MfeLog.i("getRealPathFromURI" + result);
        return result;
    }

    public static int calculateInSampleSize(BitmapFactory.Options options, int reqWidth, int reqHeight) {
        int height = options.outHeight;
        int width = options.outWidth;
//        MfeLog.i(String.format("calculateInSampleSize height=%d; width=%d; reqHeight = %d; reqWidth= %d",
//                height ,width, reqHeight, reqWidth));
        int inSampleSize = 1;
        if (height > reqHeight || width > reqWidth) {
            final int heightRatio = Math.round((float) height/ (float) reqHeight);
            final int widthRatio = Math.round((float) width / (float) reqWidth);
            inSampleSize = heightRatio < widthRatio ? heightRatio : widthRatio;
        }
        return inSampleSize;
    }
}

