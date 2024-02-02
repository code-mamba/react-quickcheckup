import jsPDF from "jspdf";

export const ImageToPdfConverter = () => {
  const convertImageToPdf = async () => {
    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-205af.appspot.com/o/file%2Fbone.jpeg?alt=media&token=8d999713-a795-45d4-a231-9484b5640a5f";
    const doc = new jsPDF();

    try {
      const dataUrl = await convertUrlToDataUrl(imageUrl);

      if (dataUrl) {
        // Add the image to the PDF
        doc.addImage(dataUrl, 'JPEG', 10, 10, 180, 180);

        // Save the PDF
        doc.save('image.pdf');
      } else {
        console.error("Data URL is empty or undefined.");
      }
    } catch (error) {
      console.error("Error converting image to Data URL:", error);
    }
  };

  const convertUrlToDataUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  };

  return (
    <button onClick={convertImageToPdf}>Convert image to pdf</button>
  );
};
