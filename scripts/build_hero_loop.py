from __future__ import annotations

import shutil
import subprocess
import uuid
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "space-video-frames" / "extracted_frames_60fps"
OUTPUT_DIR = ROOT / "assets" / "hero"

SOURCE_FRAME_RATE = 60
TARGET_DURATION_SECONDS = 12
OUTPUT_FRAME_RATE = 60
SLOW_FRAMERATE = 10
VIDEO_BASENAME = "hero-background-v2"


def load_source_frames() -> list[Path]:
    frame_paths = sorted(SOURCE_DIR.glob("frame_*.jpg"))
    if not frame_paths:
        raise RuntimeError(f"No frames found in {SOURCE_DIR}.")
    return frame_paths


def export_frames(frame_paths: list[Path]) -> Path:
    temp_dir = OUTPUT_DIR / f"_generated_frames_{uuid.uuid4().hex}"
    temp_dir.mkdir(parents=True, exist_ok=True)

    for index, frame_path in enumerate(frame_paths):
        frame = Image.open(frame_path).convert("RGB")
        frame.save(temp_dir / f"frame_{index:04d}.jpg", quality=95, optimize=True)

    poster_index = len(frame_paths) // 2
    poster = Image.open(frame_paths[poster_index]).convert("RGB")
    poster.save(OUTPUT_DIR / "hero-poster.jpg", quality=92, optimize=True)

    return temp_dir


def run_ffmpeg(command: list[str]) -> None:
    completed = subprocess.run(command, cwd=ROOT, capture_output=True, text=True)
    if completed.returncode != 0:
        raise RuntimeError(
            "ffmpeg command failed:\n"
            + " ".join(command)
            + "\n\n"
            + completed.stdout
            + completed.stderr
        )


def encode_video(temp_dir: Path) -> None:
    pattern = str(temp_dir / "frame_%04d.jpg")
    mp4_path = OUTPUT_DIR / f"{VIDEO_BASENAME}.mp4"

    run_ffmpeg(
        [
            "ffmpeg",
            "-y",
            "-framerate",
            str(SLOW_FRAMERATE),
            "-i",
            pattern,
            "-vf",
            f"minterpolate=fps={OUTPUT_FRAME_RATE}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1",
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-preset",
            "medium",
            "-crf",
            "18",
            "-movflags",
            "+faststart",
            str(mp4_path),
        ]
    )


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    frame_paths = load_source_frames()
    source_duration = len(frame_paths) / SOURCE_FRAME_RATE
    expected_duration = len(frame_paths) / SLOW_FRAMERATE
    if round(expected_duration) != TARGET_DURATION_SECONDS:
        raise RuntimeError(
            f"Expected a {TARGET_DURATION_SECONDS}s output, but current settings "
            f"produce {expected_duration:.2f}s from a {source_duration:.2f}s source."
        )

    temp_dir = export_frames(frame_paths)
    try:
        encode_video(temp_dir)
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

    print(f"Built hero assets in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
