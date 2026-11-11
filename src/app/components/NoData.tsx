import React from "react";
import Image from "next/image";

interface NoDataProps {
  message?: string;
  imageUrl?: string;
  description?: string;
  onClick?: () => void;
  buttonText?: string;
}

const NoData: React.FC<NoDataProps> = ({
  message = "No se encontraron libros",
  imageUrl = "/images/no-data.png",
  description = "Probá cambiando los filtros o buscando por otro término.",
  onClick,
  buttonText = "Volver a intentar",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm mx-auto text-center">
      {imageUrl && (
        <div className="relative w-48 h-48 mb-4">
          <Image
            src={imageUrl}
            alt="sin_datos"
            width={200}
            height={200}
            className="object-contain mx-auto"
          />
        </div>
      )}
      <p className="text-xl font-bold text-gray-900 tracking-wide mb-1">
        {message}
      </p>
      <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {onClick && (
        <button
          onClick={onClick}
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow transition-colors cursor-pointer text-sm"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default NoData;
