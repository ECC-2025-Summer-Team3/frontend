import React from "react";
import {
	PageWrapper,
	InfoTitle,
	Blank,
	InfoText,
	InfoContent,
	OfficialLink,
	BlankStar,
	FilledStar,
	TitleWrapper,
} from "../styles/CertifiInfoStyle";
import { useParams } from "react-router-dom";
import { fetchCertificateDetail } from "../services/CertificateService";
import { useEffect, useState } from "react";
import { addFavorite, deleteFavorite } from "../services/FavoritesService";

function CertifiInfo() {
	const { certificateId } = useParams();
	const [certificate, setCertificate] = useState(null);
	const [isFavorited, setIsFavorited] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchCertificateDetail(certificateId);
				setCertificate(data);
				setIsFavorited(data.favorited);
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [certificateId]);

	const handleAddFavorite = async () => {
		try {
			const data = await addFavorite(certificateId);
			setIsFavorited(true);
			alert(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDeleteFavorite = async () => {
		try {
			setIsFavorited(false);
			const data = await deleteFavorite(certificateId);
			alert(data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<PageWrapper>
			<TitleWrapper>
				<InfoTitle>{certificate?.certificateName}</InfoTitle>
				{isFavorited ? (
					<FilledStar onClick={handleDeleteFavorite} />
				) : (
					<BlankStar onClick={handleAddFavorite} />
				)}
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
