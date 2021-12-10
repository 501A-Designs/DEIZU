import React from 'react'
import { MdOutlineFlashOn,MdReportProblem } from 'react-icons/md';

export default function Banner(props) {
    const bannerType = props.bannerType;
    let bannerIcon,bannerTitle;
    if (bannerType === 'announceBanner') {
        bannerIcon = <MdOutlineFlashOn className="largeIcon" />;
        bannerTitle = '新着';
    }if (bannerType === 'cautionBanner') {
        bannerIcon = <MdReportProblem className="largeIcon" />;
        bannerTitle = '注意';
    }

    return (
        <div className={`banner ${bannerType}`}>
            <strong className="alignItems" style={{ marginBottom: '10px' }}>
                {bannerIcon}
                {bannerTitle}
            </strong>
            {props.children}
        </div>
    )
}
