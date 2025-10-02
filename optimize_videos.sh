# Video Optimization Script for Portfolio Website
# This script converts large .mov files to optimized .mp4 files for better web performance

ASSETS_DIR="/Users/hf/2025-2026/Portfolio/Website/my-react-project/public/assets/video"
OPTIMIZED_DIR="${ASSETS_DIR}/optimized"

# Create optimized directory if it doesn't exist
mkdir -p "$OPTIMIZED_DIR"

echo "Starting video optimization..."

# Function to optimize video files
optimize_video() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local output="${OPTIMIZED_DIR}/${name}_optimized.mp4"
    
    echo "Optimizing: $filename"
    
    # Check if ffmpeg is available
    if ! command -v ffmpeg &> /dev/null; then
        echo "Error: ffmpeg is not installed. Please install ffmpeg first."
        echo "On macOS: brew install ffmpeg"
        return 1
    fi
    
    # Optimize for web with high quality settings
    ffmpeg -i "$input" \
        -c:v libx264 \
        -preset medium \
        -crf 18 \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -pix_fmt yuv420p \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black" \
        -r 30 \
        -y "$output"
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully optimized: $filename -> ${name}_optimized.mp4"
        
        # Show file size comparison
        original_size=$(du -h "$input" | cut -f1)
        optimized_size=$(du -h "$output" | cut -f1)
        echo "   Original: $original_size -> Optimized: $optimized_size"
    else
        echo "❌ Failed to optimize: $filename"
    fi
}

# Process all .mov files
for mov_file in "$ASSETS_DIR"/*.mov; do
    if [ -f "$mov_file" ]; then
        optimize_video "$mov_file"
    fi
done

# Process large .mp4 files (over 30MB)
for mp4_file in "$ASSETS_DIR"/*.mp4; do
    if [ -f "$mp4_file" ]; then
        size=$(stat -f%z "$mp4_file")
        if [ $size -gt 31457280 ]; then  # 30MB in bytes
            echo "Large MP4 file detected: $(basename "$mp4_file")"
            optimize_video "$mp4_file"
        fi
    fi
done

echo "Video optimization complete!"
echo "Optimized files are located in: $OPTIMIZED_DIR"
echo ""
echo "To use the optimized files, you can either:"
echo "1. Replace the original files with the optimized versions"
echo "2. Update the projects.json to point to the optimized files"