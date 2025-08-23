import React from "react";
import {
	PageWrapper,
	InfoTitle,
	Blank,
	InfoText,
	InfoContent,
} from "../styles/CertifiInfoStyle";
import { useParams } from "react-router-dom";
import { fetchCertificateDetail } from "../services/CertificateService";
import { useEffect, useState } from "react";

function CertifiInfo() {
	const { certificateId } = useParams();
	const [certificate, setCertificate] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchCertificateDetail(certificateId);
				setCertificate(data);
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [certificateId]);

	return (
		<PageWrapper>
			<InfoTitle>{certificate?.certificateName}</InfoTitle>
			<Blank />
			<InfoText>시험개요</InfoText>
			<InfoContent>{certificate.overview}</InfoContent>
		</PageWrapper>
	);
}

export default CertifiInfo;
