import type { ApiResponseDTO } from "@/common/types/common";
import type { RoomDTO, UpdateRoomMediaDTO } from "@/common/types/videoTelegraphy";

import { authApiClient } from "./apiClient";

/** 방 상세 조회 */
export const getRoomApi = (code: string) => authApiClient.get<ApiResponseDTO<RoomDTO>>(`rooms/${code}`).json();

/** 방 생성 */
export const createRoomApi = () => authApiClient.post<ApiResponseDTO<RoomDTO>>("rooms").json();

/** 방 초대 */
export const inviteRoomApi = (friendId: string) =>
	authApiClient.post<ApiResponseDTO<RoomDTO>>(`rooms/invite/${friendId}`).json();

/** 방 참여 */
export const joinRoomApi = (code: string) => authApiClient.post<ApiResponseDTO<RoomDTO>>(`rooms/join/${code}`).json();

/** 방 떠나기 */
export const leaveRoomApi = (code: string) => authApiClient.post<ApiResponseDTO<RoomDTO>>(`rooms/leave/${code}`).json();

/** 상태 변경 */
export const updateRoomMediaApi = ({ code, ...params }: UpdateRoomMediaDTO) =>
	authApiClient.put<ApiResponseDTO<RoomDTO>>(`rooms/media/${code}`, { searchParams: params }).json();
