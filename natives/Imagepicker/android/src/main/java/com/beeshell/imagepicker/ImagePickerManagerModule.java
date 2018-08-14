package com.beeshell.imagepicker;


import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Base64;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;


import com.yalantis.ucrop.UCrop;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.UUID;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.ByteArrayOutputStream;


public class ImagePickerManagerModule extends ReactContextBaseJavaModule implements ActivityEventListener{
    static final int REQUEST_LAUNCH_IMAGE_CAPTURE = 201;
    static final int REQUEST_LAUNCH_IMAGE_LIBRARY = 202;
    static final int REQUEST_PHOTO_CUT = 205;
    static final int REQUEST_PHOTO_EDITOR = 206;
    static final int LOW_MEMORY = 20;

    public static final String RESPONSE_CODE = "code";
    public static final String RESPONSE_ERRORMSG = "errorMsg";
    public static final String RESPONSE_PATH = "path";
    public static final String RESPONSE_DATA = "data";
    public static final String SAVE_LAST_VIEW = "addVisit";
    public static final int CODE_SUCCESS = 0;
    public static final int CODE_CANCEL = 1;
    public static final int CODE_ERROR = 2;
    private int VIDEO_QUALITY = 1;
    private int mMaxWidth = 1600, mMaxHeight = 1200;
    private boolean mIsAllowCrop, mIsAllowRotate;
    private String mResponseFileType = "";

    //拍照质量
    private int mQuality = ImageCropActivity.PHOTO_QUALITY_DEFAULT;
    //是否识别二维码
    private boolean mRecognizeQR;
    //当latestView为‘addVisit’时，返回最后一张拍摄的照片的信息
    private String mLatestView;
    private ReactContext mReactContext;
    WritableMap mResponse;
    private Uri mCameraCaptureURI;
    private Callback mCallback;
    private Uri mCroppedURI;
    private Uri mCameraEditorURI;


    public ImagePickerManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        mReactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "WMImagePicker";
    }

    @ReactMethod
    public void launchCamera(final ReadableMap options, final Callback callback) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            responseCallback(callback,CODE_ERROR, "can't find current Activity");
            return;
        }
        if (!isCameraAvailable()) {
            responseCallback(callback,CODE_ERROR, "Camera not available");
            return;
        }
        goCamera(options, callback);

    }

    private void goCamera(ReadableMap options, Callback callback) {
        if (options == null) {
            responseCallback(callback, CODE_ERROR, "参数为空");
            return;
        }
        initParams(options);
        if (mQuality >= 80){
            VIDEO_QUALITY = 1;
        }else {
            VIDEO_QUALITY = 0;
        }
        getImageUri(SAVE_LAST_VIEW.equals(mLatestView));
        mCallback = callback;

        Intent intent = new Intent();
        // 指定开启系统相机的Action
        intent.setAction(MediaStore.ACTION_IMAGE_CAPTURE);
        // 设置系统相机拍摄照片完成后图片文件的存放地址
        intent.putExtra(MediaStore.EXTRA_OUTPUT, mCameraCaptureURI);
        // 此值在最低质量最小文件尺寸时是0，在最高质量最大文件尺寸时是１
        intent.putExtra(MediaStore.EXTRA_VIDEO_QUALITY, VIDEO_QUALITY);
        getCurrentActivity().startActivityForResult(intent, REQUEST_LAUNCH_IMAGE_CAPTURE);
    }


    @ReactMethod
    public void showImagePicker(final ReadableMap options, final Callback callback) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            responseCallback(callback,CODE_ERROR, "can't find current Activity");
            return;
        }
        if (options == null) {
            responseCallback(callback, CODE_ERROR, "参数为空");
            return;
        }
        initParams(options);
        mCallback = callback;
        Intent intent = new Intent(Intent.ACTION_PICK,
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        mCameraCaptureURI = null;
        currentActivity.startActivityForResult(intent, REQUEST_LAUNCH_IMAGE_LIBRARY);

    }

    private void responseCallback(Callback callback, int code, String errorMsg) {
        responseCallback(callback, code, errorMsg, null, null);
    }

    private void responseCallback(Callback callback, int code, String errorMsg, String path, String base64) {
        if (callback == null) {
            return;
        }
        mResponse = Arguments.createMap();
        mResponse.putInt(RESPONSE_CODE, code);
        mResponse.putString(RESPONSE_ERRORMSG, errorMsg != null ? errorMsg : "");
        mResponse.putString(RESPONSE_PATH, path != null ? path : "");
        mResponse.putString(RESPONSE_DATA, base64 != null ? base64 : "");

        try{
            callback.invoke(mResponse);
        } catch (Exception e) {
            //FIXME by GYB desc:
        }
    }

    private void getImageUri(boolean saveLastView) {
        // 获取扩展SD卡设备状态
        String sDStateString = Environment.getExternalStorageState();

        // 拥有可读可写权限
        if (!sDStateString.equals(Environment.MEDIA_MOUNTED)) {
            return;
        }
        File imageStorageDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "waimai");
        // Create the storage directory if it does not exist
        if (!imageStorageDir.exists()) {
            imageStorageDir.mkdirs();
        }
        File imageFile = getImageFile(saveLastView);
        mCameraCaptureURI = Uri.fromFile(imageFile);
        if (saveLastView) {
            //获取一个文件名为 mfe_bee 、权限为private的xml文件的SharedPreferences对象
            SharedPreferences sharedPreferences = getCurrentActivity().getSharedPreferences("mfe_bee", getCurrentActivity().MODE_PRIVATE);
            //得到SharedPreferences.Editor对象，并保存数据到该对象中
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putString("latest_img_uri", mCameraCaptureURI.toString());
            //保存key-value对到文件中
            editor.commit();
        }
    }

    private File getImageFile(boolean saveLastView) {
        SimpleDateFormat sd = new SimpleDateFormat("yyyyMMdd_HHmmsss");
        String s = sd.format(new java.sql.Date(System.currentTimeMillis()));
        String tempPath = Environment.getExternalStorageDirectory()
                .getAbsolutePath()
                + "/MeituanWaimai/Pictures/"
                + s
                + ".jpg";
        File file = new File(tempPath);
        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
            }
        }

        return file;
    }


    private boolean isCameraAvailable() {
        return mReactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)
                || mReactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY);
    }

    private void initParams(ReadableMap options) {
        if (options.hasKey("isAllowCrop")) {
            mIsAllowCrop = options.getBoolean("isAllowCrop");
        }
        if (options.hasKey("isAllowRotate")) {
            mIsAllowRotate = options.getBoolean("isAllowRotate");
        }
        if (options.hasKey("maxWidth")) {
            mMaxWidth = options.getInt("maxWidth");
        }
        if (options.hasKey("maxHeight")) {
            mMaxHeight = options.getInt("maxHeight");
        }
        if (options.hasKey("quality")) {
            mQuality = (int) (options.getDouble("quality") * 100);
        }
        if (options.hasKey("recognizeQR")) {
            mRecognizeQR = options.getBoolean("recognizeQR");
        }
        if (options.hasKey("latestView")) {
            mLatestView = options.getString("latestView");
        }

        if (options.hasKey("responseFileType")) {
            mResponseFileType = options.getString("responseFileType");
        }
    }

    @Override
    public void onActivityResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
        Activity currentActivity = getCurrentActivity();
        if (mCallback == null || currentActivity == null || (mCameraCaptureURI == null && requestCode == REQUEST_LAUNCH_IMAGE_CAPTURE)
                || (requestCode != REQUEST_LAUNCH_IMAGE_CAPTURE && requestCode != REQUEST_LAUNCH_IMAGE_LIBRARY
                && requestCode != REQUEST_PHOTO_CUT && requestCode != REQUEST_PHOTO_EDITOR)) {
            return;
        }
        if (resultCode != Activity.RESULT_OK) {
            responseCallback(mCallback, CODE_CANCEL, "didCancel");
            return;
        }
        Uri uri = mCameraCaptureURI;
        if (REQUEST_LAUNCH_IMAGE_CAPTURE == requestCode) {
            compressPhoto(currentActivity, mCallback, uri);
            return;
        }
        if (REQUEST_LAUNCH_IMAGE_LIBRARY == requestCode) {
            if (mCroppedURI != null) {
                uri = mCroppedURI;
                Uri uriTmp = data.getData();
                if (uriTmp != null)
                    uri = uriTmp;
            } else {
                uri = data.getData();
            }
            compressPhoto(currentActivity, mCallback, uri);
            return;
        }

        switch (requestCode) {
            case REQUEST_PHOTO_EDITOR:
                uri = mCameraEditorURI;
                break;
            case REQUEST_PHOTO_CUT:
                uri = getUri(data);
                break;
            default:
                break;
        }
        if (uri != null) {
            responseCallback(mCallback, CODE_SUCCESS, "successful", uri.toString(), mResponseFileType.equals("base64") ? getBase64StringFromFile(uri.getPath()) : null);
        } else {
            responseCallback(mCallback, CODE_ERROR, "uri is null");
        }
        if (currentActivity == null) {
            return;
        }
        if (SAVE_LAST_VIEW.equals(mLatestView)) {
            //获取一个文件名为 mfe_bee 、权限为private的xml文件的SharedPreferences对象
            SharedPreferences sharedPreferences = currentActivity.getSharedPreferences("mfe_bee", currentActivity.MODE_PRIVATE);

            //得到SharedPreferences.Editor对象，并保存数据到该对象中
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putString("latest_img_uri", "");
            //保存key-value对到文件中
            editor.commit();
        }
        if (mCameraCaptureURI != null) {
            String realImagePath = ImageCompressUtil.getRealPathFromURI(currentActivity, mCameraCaptureURI);
            if (TextUtils.isEmpty(realImagePath)) {
                return;
            }
            File file = new File(realImagePath);
            if (file.isFile() && file.exists()) {
                file.delete();
            }
        }

    }

    private String getBase64StringFromFile(String absoluteFilePath) {
        InputStream inputStream = null;
        try {
            inputStream = new FileInputStream(absoluteFilePath);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        if (inputStream == null) {
            return "";
        }

        byte[] bytes;
        byte[] buffer = new byte[8192];
        int bytesRead;
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try {
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                output.write(buffer, 0, bytesRead);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            if (inputStream != null) {
                inputStream.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        bytes = output.toByteArray();
        try {
            output.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return Base64.encodeToString(bytes, Base64.NO_WRAP);
    }

    private void compressPhoto(Activity currentActivity, Callback callback, Uri uri) {
        if (!mIsAllowCrop) {
            // 不需要裁剪时使用 ImageRotateActivity 可以隐藏旋转按钮
            launchRotate(uri, false);
        } else {
            launchCropper(uri);
        }

        //不需要处理的
//        File imageFile = createNewFile(true);
//        Uri comPressImg = ImageCompressUtil.comPressImg(getCurrentActivity(), imageFile, uri, mMaxWidth, mMaxHeight, mQuality);
//        if (comPressImg != null) {
//            responseCallback(callback, CODE_SUCCESS, "successful", comPressImg.toString(), null);
//        } else {
//            responseCallback(callback, CODE_ERROR, "uri is null");
//            // LxReportUtil.reportEvent(null , LxReportField.IMAGE_PICKER_MODULE_CALLBACK_PHOTO_ERROR, null);
////            MfeLog.i("compressPhoto uri is null");
//        }
//        if (currentActivity == null) {
//            return;
//        }
//        if (SAVE_LAST_VIEW.equals(mLatestView)) {
//            //获取一个文件名为 mfe_bee 、权限为private的xml文件的SharedPreferences对象
//            SharedPreferences sharedPreferences = currentActivity.getSharedPreferences("mfe_bee", currentActivity.MODE_PRIVATE);
////
////        //得到SharedPreferences.Editor对象，并保存数据到该对象中
//            SharedPreferences.Editor editor = sharedPreferences.edit();
//            editor.putString("latest_img_uri", "");
//            //保存key-value对到文件中
//            editor.commit();
//        }
//        if (uri != null) {
//            String realImagePath = ImageCompressUtil.getRealPathFromURI(currentActivity, uri);
//            File file = new File(realImagePath);
//            if (file.isFile() && file.exists()) {
//                file.delete();
//            }
//        }
    }

    private Uri getUri(Intent data) {
        Uri uri;
        if (data == null) {
            return null;
        }
        if (data.getData() == null) {
            if (data.getAction() == null) {
                uri = mCroppedURI;
            } else {
                //Compatible for android 4.1-4.3
                uri = Uri.parse(data.getAction());
            }
        } else {
            //android 4.4+
            uri = data.getData();
        }
        return uri;
    }


    private void launchCropper(Uri uri) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            responseCallback(mCallback, CODE_ERROR, "can't find current Activity");
            return;
        }
        Intent intent = new Intent(currentActivity, ImageCropActivity.class);
        File imageFile = createNewFile(true);
        mCroppedURI = Uri.fromFile(imageFile);
        Bundle bundle = new Bundle();
        bundle.putParcelable(UCrop.EXTRA_INPUT_URI, uri);
        bundle.putParcelable(UCrop.EXTRA_OUTPUT_URI, mCroppedURI);
        intent.putExtra(UCrop.EXTRA_ASPECT_RATIO_X, 4);
        intent.putExtra(UCrop.EXTRA_ASPECT_RATIO_Y, 3);
        intent.putExtras(bundle);
        intent.putExtra(ImageCropActivity.PHOTO_QUALITY, mQuality);
        intent.putExtra(ImageCropActivity.PHOTO_MAX_HEIGHT, mMaxHeight);
        intent.putExtra(ImageCropActivity.PHOTO_MAX_WIDTH, mMaxWidth);

        intent.putExtra(ImageCropActivity.IS_ALLOW_ROTATE, mIsAllowRotate);
        intent.putExtra(ImageCropActivity.IS_ALLOW_CROP, mIsAllowCrop);

        currentActivity.startActivityForResult(intent, REQUEST_PHOTO_CUT);
    }

    private void launchRotate(Uri uri, boolean AutoFinish) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            responseCallback(mCallback, CODE_ERROR, "can't find current Activity");
            return;
        }
        Intent intent = new Intent(getCurrentActivity(), ImageRotateActivity.class);
        intent.setData(uri);
        File imageFile = createNewFile(true);
        mCameraEditorURI = Uri.fromFile(imageFile);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(imageFile).getPath());
        intent.putExtra("maxWidth", mMaxWidth);
        intent.putExtra("maxHeight", mMaxHeight);
        intent.putExtra("recognizeQR",mRecognizeQR);
        intent.putExtra(ImageRotateActivity.PHOTO_QUALITY, mQuality);
        intent.putExtra(ImageRotateActivity.AUTO_FINISH, AutoFinish);
        currentActivity.startActivityForResult(intent, REQUEST_PHOTO_EDITOR);
    }

    /**
     * Create a new file
     *
     * @return an empty file
     */
    private File createNewFile(final boolean forcePictureDirectory) {
        String filename = "image-" + UUID.randomUUID().toString() + ".jpg";
        if (forcePictureDirectory != true) {
            return new File(mReactContext.getCacheDir(), filename);
        } else {
            File path = Environment.getExternalStoragePublicDirectory(
                    Environment.DIRECTORY_PICTURES);
            File f = new File(path, filename);

            try {
                path.mkdirs();
                f.createNewFile();
            } catch (IOException e) {
            }
            return f;
        }
    }



    @Override
    public void onNewIntent(Intent intent) {

    }
}

