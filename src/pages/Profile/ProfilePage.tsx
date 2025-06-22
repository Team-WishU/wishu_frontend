import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../src/components/Header/Header";
import { useUser } from "../../context/UserContext";

const API_BASE = process.env.REACT_APP_API_URL;

interface UserSimple {
    _id: string;
    nickname: string;
    profileImage: string;
    email: string;
}

interface Product {
    _id: string;
    imageUrl: string;
    title: string;
    category: string;
}

const ProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // id는 닉네임
    const { user } = useUser();
    const [profile, setProfile] = useState<UserSimple | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [friendRequested, setFriendRequested] = useState<boolean>(false);
    const navigate = useNavigate();

    // 1) 닉네임으로 유저 정보 조회 (ID 포함)
    useEffect(() => {
        if (!id) return; // id 없으면 요청 안 함
        setLoading(true);
        setError(null);
        (async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.get(`${API_BASE}/users/nickname/${encodeURIComponent(id)}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(res.data);
            } catch (error: any) {
                setError(
                    error.response?.status === 404
                        ? "해당 사용자를 찾을 수 없습니다."
                        : "프로필을 불러오는 데 실패했습니다."
                );
                setProfile(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    // 2) 닉네임으로 상품 목록 조회
    useEffect(() => {
        if (!profile) return;
        (async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.get(`${API_BASE}/products/user-by-nickname/${encodeURIComponent(profile.nickname)}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(res.data);
            } catch (error) {
                setProducts([]);
            }
        })();
    }, [profile]);

    // 3) 친구 상태 체크 (ID 기준)
    useEffect(() => {
        if (!user || !profile) return;
        (async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const friendsRes = await axios.get(`${API_BASE}/friends`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const requestsRes = await axios.get(`${API_BASE}/friends/requests`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsFriend(friendsRes.data.some((f: any) => f._id === profile._id));
                setFriendRequested(requestsRes.data.outgoing.some((f: any) => f._id === profile._id));
            } catch (err) {
                setIsFriend(false);
                setFriendRequested(false);
            }
        })();
    }, [user, profile]);

    if (loading) return <div>로딩 중...</div>;
    if (error || !profile) return <div>{error || "유저를 찾을 수 없습니다."}</div>;

    const isMe = user && (user.nickname === profile.nickname || user.email === profile.email);

    // 친구 추가 요청 (ID 기준)
    const handleAddFriend = async () => {
        if (!profile) return;
        try {
            const token = localStorage.getItem("accessToken");
            await axios.post(`${API_BASE}/friends/request`, { userId: profile._id }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("친구 요청을 보냈습니다!");
            setFriendRequested(true);
        } catch (err: any) {
            alert(err.response?.data?.message || "친구 요청 실패");
        }
    };

    return (
        <div>
            <Header />
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <img
                    src={
                        profile.profileImage?.includes("/assets")
                            ? profile.profileImage
                            : `/assets/images/Signup/${profile.profileImage || "default.png"}`
                    }
                    alt="프로필"
                    style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover", marginBottom: 16 }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/images/Signup/default.png";
                    }}
                />
                <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: "#8e4ffb" }}>
                    {profile.nickname}
                </div>

                {!isMe && (
                    isFriend ? (
                        <div style={{ marginBottom: 24, color: "#1a7f1a", fontWeight: 600 }}>이미 친구입니다</div>
                    ) : friendRequested ? (
                        <div style={{ marginBottom: 24, color: "#888" }}>요청 보냄</div>
                    ) : (
                        <button
                            style={{
                                padding: "0.5rem 2rem",
                                borderRadius: 24,
                                border: "none",
                                background: "#8e4ffb",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 18,
                                marginBottom: 24,
                                cursor: "pointer",
                            }}
                            onClick={handleAddFriend}
                        >
                            친구 추가
                        </button>
                    )
                )}

                <div style={{ marginTop: 32 }}>
                    <h2 style={{ fontSize: 20, marginBottom: 20, color: "#333" }}>이 유저의 상품</h2>
                    {products.length === 0 ? (
                        <div style={{ color: "#aaa" }}>아직 등록한 상품이 없습니다.</div>
                    ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
                            {products.map((p) => (
                                <div key={p._id} style={{ width: 180, marginBottom: 20, cursor: "pointer" }} onClick={() => window.location.href = `/products/${p._id}`}>
                                    <img src={p.imageUrl} alt={p.title} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12, boxShadow: "0 1px 8px #eee" }} />
                                    <div style={{ fontSize: 16, marginTop: 8 }}>{p.title}</div>
                                    <div style={{ color: "#8e4ffb", fontSize: 13 }}>#{p.category}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
