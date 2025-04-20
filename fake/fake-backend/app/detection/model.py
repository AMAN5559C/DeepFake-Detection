# app/detection/model.py

import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
from pretrainedmodels import xception

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class DeepfakeDetector:
    def __init__(self):
        # First load the model with pretrained weights (num_classes=1000 by default)
        self.model = xception(pretrained='imagenet')

        # Replace the final classification layer for 2-class classification
        in_features = self.model.last_linear.in_features
        self.model.last_linear = nn.Linear(in_features, 2)

        self.model.eval().to(device)

        # Optional: Load your trained weights if available
        # self.model.load_state_dict(torch.load("xception_deepfake.pth", map_location=device))

        self.transform = transforms.Compose([
            transforms.Resize((299, 299)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            ),
        ])

    def predict_frame(self, frame_path):
        image = Image.open(frame_path).convert("RGB")
        image_tensor = self.transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            outputs = self.model(image_tensor)
            probabilities = torch.softmax(outputs, dim=1)
            confidence, prediction = torch.max(probabilities, 1)

        return prediction.item(), confidence.item()

    def predict_batch(self, frame_paths):
        results = []
        for path in frame_paths:
            pred, conf = self.predict_frame(path)
            results.append((pred, conf))

        total = len(results)
        fake_count = sum(1 for r in results if r[0] == 1)
        avg_conf = sum(r[1] for r in results) / total

        verdict = "Fake" if fake_count / total > 0.5 else "Real"
        return {
            "verdict": verdict,
            "confidence": round(avg_conf * 100, 2),
            "total_frames": total,
            "fake_frames": fake_count
        }

# Detector instance (keep it initialized once)
detector = DeepfakeDetector()

# Entry function for routes to call
def detect_deepfake(frame_paths):
    return detector.predict_batch(frame_paths)
