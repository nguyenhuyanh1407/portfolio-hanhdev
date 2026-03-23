export const TOTAL_FRAMES = 480;
export const FRAMES_PER_ZONE = 80;

export const getFramePath = (frameIndex: number): string => {
  // Ensure we loop safely if index goes out of bounds
  const safeIndex = Math.max(0, Math.min(frameIndex, TOTAL_FRAMES - 1));
  const folderNum = Math.floor(safeIndex / FRAMES_PER_ZONE) + 1; // 1 through 6
  const localIndex = safeIndex % FRAMES_PER_ZONE; // 0 through 79
  
  const paddedIndex = localIndex.toString().padStart(3, '0');
  
  // Trỏ về Cloudflare CDN vì folder local đã chuyển ra Desktop
  const cdnUrl = "https://solitary-salad-9c8e.nguyenhuyanh912548.workers.dev";
  return `${cdnUrl}/frame${folderNum}/Frame${folderNum}_${paddedIndex}.jpg`;
};
