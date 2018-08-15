package com.beeshell.imagepicker;


import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.zxing.Result;

import com.beeshell.imagepicker.R;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import uk.co.senab.photoview.PhotoView;


public class ImageRotateActivity extends Activity {
    public static final String AUTO_FINISH = "autoFinish";
    public static final String PHOTO_QUALITY = "quality";
    public static final String IS_ALLOW_CROP = "isAllowCrop";
    public static final int PHOTO_QUALITY_DEFAULT = 80;
    private final int AUTO_FINISH_TIME = 200;
    private PhotoView photoView;

    private Button okBtn;
    private Button rotateBtn;
    private Button cancelBth;
    private RelativeLayout mRlBottom;
    private TextView mTvBottomDesc;
    private Intent intent;
    private String path;
    private float degree = 0;
    private Boolean recognizeQR;
    private int mQuality = PHOTO_QUALITY_DEFAULT;
    private int mMaxWidth, mMaxHeight;
    private Uri mUri;
    private boolean mAutoFinish;
    private ProgressDialog mProgressDialog;
    private Bitmap mPhoto;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_rotate);
        photoView = (PhotoView) findViewById(R.id.pic);
        okBtn = (Button) findViewById(R.id.ok);
        rotateBtn = (Button) findViewById(R.id.ratote);
        cancelBth = (Button) findViewById(R.id.cancel);
        mRlBottom = (RelativeLayout) findViewById(R.id.RlBottom);
        mTvBottomDesc = (TextView) findViewById(R.id.tvBottomDesc);
        intent = getIntent();
        recognizeQR = intent.getBooleanExtra("recognizeQR",false);
        //decodeBitmapFromFile 防止图片过大，超出硬件加速的大小限制，从而使图片不能正常显示
        if (intent == null) {
            finish();
            return;
        }

        mQuality = intent.getIntExtra(PHOTO_QUALITY, PHOTO_QUALITY_DEFAULT);
        mAutoFinish = intent.getBooleanExtra(AUTO_FINISH, false);
        mMaxHeight = intent.getIntExtra("maxHeight", 1600);
        mMaxWidth = intent.getIntExtra("maxWidth", 1200);
        mUri = intent.getData();
        if (mUri == null) {
            finish();
            return;
        }
        path = intent.getStringExtra(MediaStore.EXTRA_OUTPUT);
        rotateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (degree >= 360) {
                    degree = 90;
                } else {
                    degree = degree + 90;
                }
                photoView.setRotationTo(degree);
            }
        });

        if (!intent.getBooleanExtra(IS_ALLOW_CROP, false)) {
            rotateBtn.setVisibility(View.GONE);
        }

        okBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mProgressDialog != null && !mProgressDialog.isShowing()) {
                    mProgressDialog.show(ImageRotateActivity.this, "", "正在保存图片...");
                }

                SaveImageTask saveImageTask = new SaveImageTask();
                saveImageTask.execute();
            }
        });

        cancelBth.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                setResult(RESULT_CANCELED, intent);
                finish();
            }
        });
        mProgressDialog = new ProgressDialog(ImageRotateActivity.this);

        if (mAutoFinish) {
            mTvBottomDesc.setVisibility(View.GONE);
            mRlBottom.setVisibility(View.GONE);
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    SaveImageTask saveImageTask = new SaveImageTask();
                    saveImageTask.execute();
                }
            },AUTO_FINISH_TIME);
        }else {
            mTvBottomDesc.setVisibility(View.VISIBLE);
            mRlBottom.setVisibility(View.VISIBLE);
        }
        try {
            String realPath = getRealPathFromURI(mUri);
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
            BitmapFactory.decodeFile(realPath,options);
            options.inPreferredConfig = Bitmap.Config.RGB_565;
            options.inSampleSize = calculateInSampleSize(options, mMaxWidth, mMaxHeight);
            options.inJustDecodeBounds = false;
            mPhoto = BitmapFactory.decodeFile(realPath,options);
        } catch (Exception e) {
            //FIXME by GYB desc: 日志上报
            e.printStackTrace();
        }
        if (mPhoto == null) {
            finish();
            return;
        }
        photoView.setImageBitmap(mPhoto);
    }

    private int calculateInSampleSize(BitmapFactory.Options options, int reqWidth, int reqHeight) {
        int height = options.outHeight;
        int width = options.outWidth;
        int inSampleSize = 1;
        if (height > reqHeight || width > reqWidth) {
            final int heightRatio = Math.round((float) height/ (float) reqHeight);
            final int widthRatio = Math.round((float) width / (float) reqWidth);
            inSampleSize = heightRatio < widthRatio ? heightRatio : widthRatio;
        }
        return inSampleSize;
    }

    private String getRealPathFromURI(Uri uri) {
        String result;
        String[] projection = {MediaStore.Images.Media.DATA};
        Cursor cursor = this.getContentResolver().query(uri, projection, null, null, null);
        if (cursor == null) { // Source is Dropbox or other similar local file path
            result = uri.getPath();
        } else {
            cursor.moveToFirst();
            int idx = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            result = cursor.getString(idx);
            cursor.close();
        }
        return result;
    }

    private class SaveImageTask extends AsyncTask<String, String, String> {
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @Override
        protected String doInBackground(String... params) {
//            Result result = null;
            if (null == mPhoto) {
                return null;
            }
            File file = new File(path);
            FileOutputStream fos = null;
            try {
                if (degree != 0) {
                    Matrix matrix = new Matrix();
                    matrix.setRotate(degree);
                    mPhoto = Bitmap.createBitmap(mPhoto, 0, 0, mPhoto.getWidth(), mPhoto.getHeight(), matrix, true);
//                    MfeLog.i("create Bitmap Rotate");
                }
                fos = new FileOutputStream(file);
                mPhoto.compress(Bitmap.CompressFormat.JPEG, mQuality, fos);
                //FIXME by GYB desc: 这块直接对原图压缩了  让蜜蜂那边测下 看有问题没  有问题的话再新建图片处理
                if (recognizeQR){
//                    byte[] mData = QrUtils.getYUV420sp(mPhoto.getWidth(), mPhoto.getHeight(), mPhoto);
//                    result = QrUtils.decodeImage(mData, mPhoto.getWidth(), mPhoto.getHeight());
                }
            } catch (FileNotFoundException e) {
//                MfeLog.catchException(e);
            } finally {
                mPhoto.recycle();
                mPhoto = null;
                try {
                    if (fos != null) {
                        fos.flush();
                        fos.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
//            if (result != null) {
//                //识别成功
//                return result.getText().toString();
//            }
            return null;
        }

        @Override
        protected void onPostExecute(String string) {
            super.onPostExecute(string);
            if (mProgressDialog != null) {
                mProgressDialog.dismiss();
            }
            Intent intent = new Intent();
            //FIXME by GYB desc:
//            intent.putExtra(RNHelper.RN_BACK_QRCODE,string);
//            if (BuildConfig.DEBUG && recognizeQR){
//                Toast.makeText(ImageRotateActivity.this, string,Toast.LENGTH_LONG).show();
//            }
            setResult(RESULT_OK, intent);
            finish();

        }

        @Override
        protected void onCancelled(String aVoid) {
            super.onCancelled(aVoid);
        }

        @Override
        protected void onCancelled() {
            super.onCancelled();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mProgressDialog != null) {
            mProgressDialog.dismiss();
        }
    }
}



