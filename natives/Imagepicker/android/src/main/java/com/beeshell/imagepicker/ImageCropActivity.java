package com.beeshell.imagepicker;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AccelerateInterpolator;
import android.widget.Button;
import android.widget.RelativeLayout;


import com.beeshell.imagepicker.R;
import com.yalantis.ucrop.UCrop;
import com.yalantis.ucrop.callback.BitmapCropCallback;
import com.yalantis.ucrop.view.GestureCropImageView;
import com.yalantis.ucrop.view.OverlayView;
import com.yalantis.ucrop.view.TransformImageView;
import com.yalantis.ucrop.view.UCropView;

/**
 * Created by wangliqiang on 16/7/14.
 */
public class ImageCropActivity extends Activity {
    public static final String AUTO_FINISH = "autoFinish";
    public static final String PHOTO_QUALITY = "quality";
    public static final String PHOTO_MAX_HEIGHT = "maxHeight";
    public static final String PHOTO_MAX_WIDTH = "maxWidth";

    public static final String IS_ALLOW_ROTATE = "isAllowRotate";
    public static final String IS_ALLOW_CROP = "isAllowCrop";

    public static final int PHOTO_QUALITY_DEFAULT = 80;
    private final int AUTO_FINISH_TIME = 200;
    private UCropView mUCropView;
    private GestureCropImageView mGestureCropImageView;
    private OverlayView mOverlayView;
    private Button okBtn;
    private Button rotateBtn;
    private Button cancelBth;
    private int mQuality = PHOTO_QUALITY_DEFAULT;

    private View mBlockingView;
    private boolean mAutoFinish;
    private int mMaxHeight = 1600;
    private int mMaxWidth = 1200;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_crop);
        if (getIntent() != null) {
            mAutoFinish = getIntent().getBooleanExtra(AUTO_FINISH, false);
            mQuality = getIntent().getIntExtra(PHOTO_QUALITY, PHOTO_QUALITY_DEFAULT);
            mMaxHeight = getIntent().getIntExtra(PHOTO_MAX_HEIGHT, 1600);
            mMaxWidth = getIntent().getIntExtra(PHOTO_MAX_WIDTH, 1200);
        }

        initiateRootViews();
        setImageData(getIntent());
        addBlockingView();
        if (mAutoFinish) {
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    autoSaveImage();
                }
            },AUTO_FINISH_TIME);
        }
    }

    private void initiateRootViews() {
        mUCropView = findViewById(R.id.pic);
        mGestureCropImageView = mUCropView.getCropImageView();
        mOverlayView = mUCropView.getOverlayView();
        if (mAutoFinish) {
            mOverlayView.setVisibility(View.GONE);
        }
        mGestureCropImageView.setMaxHeight(mMaxHeight);
        mGestureCropImageView.setMaxWidth(mMaxWidth);

        RelativeLayout RlBottom = (RelativeLayout) findViewById(R.id.RlBottom);
        if (mAutoFinish) {
            RlBottom.setVisibility(View.GONE);
        }
        okBtn = (Button) findViewById(R.id.ok);
        rotateBtn = (Button) findViewById(R.id.ratote);

        if (!getIntent().getBooleanExtra(IS_ALLOW_ROTATE, false)) {
            rotateBtn.setVisibility(View.GONE);
        }

        cancelBth = (Button) findViewById(R.id.cancel);

        mGestureCropImageView.setMaxBitmapSize(1600);

        mGestureCropImageView.setTransformImageListener(mImageListener);

        rotateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mGestureCropImageView.postRotate(90);
            }
        });

        okBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cropAndSaveImage();
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
    }

    private void setImageData(@NonNull Intent intent) {
        Uri inputUri = intent.getParcelableExtra(UCrop.EXTRA_INPUT_URI);
        Uri outputUri = intent.getParcelableExtra(UCrop.EXTRA_OUTPUT_URI);

        float aspectRatioX = intent.getFloatExtra(UCrop.EXTRA_ASPECT_RATIO_X, 4);
        float aspectRatioY = intent.getFloatExtra(UCrop.EXTRA_ASPECT_RATIO_Y, 3);

        if (intent.getBooleanExtra(IS_ALLOW_CROP, true)) {
            mGestureCropImageView.setTargetAspectRatio(aspectRatioX/aspectRatioY);
        }

        if (inputUri != null && outputUri != null) {
            try {
                mGestureCropImageView.setImageUri(inputUri, outputUri);
            } catch (Exception e) {
                setResultError(e);
                finish();
            }
        } else {
            setResultError(new NullPointerException(getString(com.yalantis.ucrop.R.string.ucrop_error_input_data_is_absent)));
            finish();
        }
    }

    protected void cropAndSaveImage() {

        mBlockingView.setClickable(true);
        final ProgressDialog progressDialog = new ProgressDialog(ImageCropActivity.this);
        if (! progressDialog.isShowing()) {
            progressDialog.show(this, "", "正在保存图片...");
        }
        //FIXME by GYB desc: 这个压缩比使用传递过来的
        mGestureCropImageView.cropAndSaveImage(Bitmap.CompressFormat.JPEG, mQuality, new BitmapCropCallback() {

            @Override
            public void onBitmapCropped(@NonNull Uri resultUri) {
                if (progressDialog != null && progressDialog.isShowing()) {
                    progressDialog.dismiss();
                }
                setResult(RESULT_OK, new Intent()
                        .putExtra(UCrop.EXTRA_OUTPUT_URI, resultUri)
                        .putExtra(UCrop.EXTRA_OUTPUT_CROP_ASPECT_RATIO, mGestureCropImageView.getTargetAspectRatio()));
                finish();
                progressDialog.dismiss();
            }

            @Override
            public void onCropFailure(@NonNull Throwable t) {
                setResultError(t);
                finish();
                progressDialog.dismiss();
            }
        });
    }
    protected void autoSaveImage() {
        //FIXME by GYB desc: 这个压缩比使用传递过来的
        mGestureCropImageView.cropAndSaveImage(Bitmap.CompressFormat.JPEG, mQuality, new BitmapCropCallback() {

            @Override
            public void onBitmapCropped(@NonNull Uri resultUri) {
                setResult(RESULT_OK, new Intent()
                        .putExtra(UCrop.EXTRA_OUTPUT_URI, resultUri)
                        .putExtra(UCrop.EXTRA_OUTPUT_CROP_ASPECT_RATIO, mGestureCropImageView.getTargetAspectRatio()));
                finish();
            }

            @Override
            public void onCropFailure(@NonNull Throwable t) {
                setResultError(t);
                finish();
            }
        });
    }

    private void addBlockingView() {
        if (mBlockingView == null) {
            mBlockingView = new View(this);
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
            mBlockingView.setLayoutParams(lp);
            mBlockingView.setClickable(true);
        }

        ((RelativeLayout) findViewById(R.id.image_view_crop)).addView(mBlockingView);
    }

    private TransformImageView.TransformImageListener mImageListener = new TransformImageView.TransformImageListener() {
        @Override
        public void onRotate(float currentAngle) {
        }

        @Override
        public void onScale(float currentScale) {
        }

        @Override
        public void onLoadComplete() {
            mUCropView.animate().alpha(1).setDuration(300).setInterpolator(new AccelerateInterpolator());
            mBlockingView.setClickable(false);
        }

        @Override
        public void onLoadFailure(@NonNull Exception e) {
            setResultError(e);
            finish();
        }

    };

    protected void setResultError(Throwable throwable) {
        setResult(UCrop.RESULT_ERROR, new Intent().putExtra(UCrop.EXTRA_ERROR, throwable));
    }

}

