import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import AIControlPanel from "../components/AIControlPanel";
import PreviewPanel from "../components/PreviewPanel";
import UploadPanel from "../components/UploadPanel";
import GeneratePanel from "../components/GeneratePanel";
import ResultPanel from "../components/ResultPanel";
import FactoryDashboard from "../components/FactoryDashboard";

import { generateImage } from "../services/vision.service";

export default function Studio() {
  const [modelFile, setModelFile] = useState(null);
  const [productFiles, setProductFiles] = useState([]);

  const [characterMode, setCharacterMode] =
    useState("keep");

  const [sceneMode, setSceneMode] =
    useState("keep");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [factoryStatus, setFactoryStatus] =
    useState(null);

  const productLock = true;

  const model = useMemo(() => {
    if (!modelFile) return null;

    return {
      name: modelFile.name,
      preview: URL.createObjectURL(modelFile),
      file: modelFile,
    };
  }, [modelFile]);

  const products = useMemo(() => {
    return productFiles.map((file, index) => ({
      id: `${file.name}-${index}`,
      name: file.name,
      preview: URL.createObjectURL(file),
      file,
    }));
  }, [productFiles]);

  useEffect(() => {

    const timer = setInterval(async () => {

      try {

        const { data } =
          await axios.get(
            "http://localhost:5000/api/vision/status"
          );

        if (data.success) {

          setFactoryStatus(data);

        }

      } catch (err) {
        // Không hiện lỗi
      }

    }, 2000);

    return () => clearInterval(timer);

  }, []);

  const handleGenerate = async () => {

    if (!model) {
      alert("Vui lòng chọn người mẫu.");
      return;
    }

    if (products.length === 0) {
      alert("Vui lòng chọn sản phẩm.");
      return;
    }

    try {

      setLoading(true);

      setResult(null);

      const formData = new FormData();

      formData.append(
        "model",
        model.file
      );

      products.forEach((item) => {

        formData.append(
          "products",
          item.file
        );

      });

      formData.append(
        "characterMode",
        characterMode
      );

      formData.append(
        "sceneMode",
        sceneMode
      );

      const data =
        await generateImage(formData);

      setResult(data);

    } catch (err) {

      console.error(err);

      alert(err.message);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "30px auto",
        padding: "0 20px",
        color: "#fff",
      }}
    >
      <h1
        style={{
          marginBottom: 20,
        }}
      >
        🍌 Banana Studio AI
      </h1>

      <FactoryDashboard
        result={result}
        status={factoryStatus}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "300px 1fr",
          border: "1px solid #333",
          borderRadius: 12,
          overflow: "hidden",
          background: "#1b1b1b",
        }}
      >
        <AIControlPanel
          productLock={productLock}
          characterMode={
            characterMode
          }
          sceneMode={sceneMode}
          onCharacterModeChange={
            setCharacterMode
          }
          onSceneModeChange={
            setSceneMode
          }
        />

        <div
          style={{
            background: "#fff",
            minHeight: 500,
          }}
        >
          <PreviewPanel
            model={model}
            products={products}
          />
        </div>
      </div>

      <UploadPanel
        model={model}
        products={products}
        onModelChange={setModelFile}
        onProductsChange={
          setProductFiles
        }
      />

      <GeneratePanel
        loading={loading}
        disabled={
          loading ||
          !model ||
          products.length === 0
        }
        onGenerate={
          handleGenerate
        }
      />

      <ResultPanel
        result={result}
      />
    </div>
  );
}