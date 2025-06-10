import React from "react";
import Header from "../../../src/components/Header/Header";
import "../../styles/ProfileSetting.css";

const ProfileSetting: React.FC = () => {
    return (
        <div className="profile-setting-wrapper">
            <Header />

            <div className="profile-setting-container">
                <h2 className="setting-title">설정</h2>

                <div className="profile-card">
                    <h3 className="card-title">프로필 설정</h3>

                    <div className="profile-section">
                        <label className="profile-label">프로필 사진</label>
                        <div className="profile-image-wrapper">
                            <img
                                src="/assets/images/profile/profile.png"
                                alt="프로필"
                                className="profile-avatar"
                            />
                            <button className="upload-button">+</button>
                        </div>
                    </div>

                    <div className="profile-section">
                        <label className="profile-label">닉네임</label>
                        <input
                            type="text"
                            className="nickname-input"
                            placeholder="닉네임을 입력하세요"
                        />
                    </div>

                    <div className="button-wrapper">
                        <button className="save-button">프로필 저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetting;
