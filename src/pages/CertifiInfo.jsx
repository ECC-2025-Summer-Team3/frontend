import React from "react";
import {
	PageWrapper,
	InfoTitle,
	Blank,
	InfoText,
	InfoContent,
	OfficialLink,
	BlankStar,
	TitleWrapper,
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
			<TitleWrapper>
				<InfoTitle>{certificate?.certificateName}</InfoTitle>
				<BlankStar />
			</TitleWrapper>
			<Blank />
			<InfoText>시험개요</InfoText>
			<InfoContent>{certificate?.overview}</InfoContent>
			<Blank />
			<InfoText>시행기관</InfoText>
			<InfoContent>{certificate?.organization}</InfoContent>
			<Blank />
			<InfoText>시험방식</InfoText>
			<InfoContent>{certificate?.examMethod}</InfoContent>
			<Blank />
			<InfoText>합격기준</InfoText>
			<InfoContent>{certificate?.passingCriteria}</InfoContent>
			<Blank />
			<InfoText>시험자격</InfoText>
			<InfoContent>{certificate?.qualification}</InfoContent>
			<Blank />
			<InfoText>시험료</InfoText>
			<InfoContent>{certificate?.fee}</InfoContent>
			<Blank />
			<InfoText>특이사항</InfoText>
			<InfoContent>{certificate?.features}</InfoContent>
			<Blank />
			<InfoText />
			<OfficialLink
				href={certificate?.officialSite}
				target="_blank"
				rel="noopener noreferrer"
			>
				공식사이트
			</OfficialLink>
		</PageWrapper>
	);
}

export default CertifiInfo;
