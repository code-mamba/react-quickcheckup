import React from 'react'
import jsPDF from 'jspdf'
import { Button } from 'src/components/atom'

export const ImageToPdfConverter = (props) => {
	const convertImageToPdf = async () => {
		const imageUrl = props.imgUrl
		const doc = new jsPDF()
		const downloadTime = new Date().toLocaleString()

		try {
			const dataUrl = await convertUrlToDataUrl(imageUrl)

			if (dataUrl) {
				doc.addImage(dataUrl, 'JPEG', 10, 10, 180, 180)
				doc.save(`${downloadTime}`)
			} else {
				return 'Data URL is empty or undefined.'
			}
		} catch (error) {
			throw ('Error converting image to Data URL:', error)
		}
	}

	const convertUrlToDataUrl = (url) => {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.crossOrigin = 'Anonymous'
			img.onload = () => {
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')
				canvas.width = img.width
				canvas.height = img.height
				ctx.drawImage(img, 0, 0)
				resolve(canvas.toDataURL('image/jpeg'))
			}
			img.onerror = (error) => reject(error)
			img.src = url
		})
	}

	return (
		<>
			<img src={props.imgUrl} height="500px" width="500px" alt="scanreport" />
			<Button
				label="Download Pdf"
				variant="success"
				onClick={convertImageToPdf}
			/>
		</>
	)
}
