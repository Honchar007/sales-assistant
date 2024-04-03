import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// components
import SideBar from '../../components/SideBar';
import { StyledHeader } from '../../components/StyledHeader';
import MatchedCase from './components/MatchedCase';
import StyledButton from '../../components/StyledButton';

// store
import { useAppSelector } from '../../redux/hook';
import { selectIsOpen } from '../../redux/sidebarSlicer';
import { useGetFeedByIdQuery } from '../../redux/rtk/feeds.api';

// utils
import { formatDate, getColor } from '../Feed/util';

// models

function FeedExpand() {
  const { id } = useParams();

  const { data } = useGetFeedByIdQuery(id as string);

  const isOpen = useAppSelector(selectIsOpen);

  const feed = useMemo(() => {
    return {
      accountId: data?.data.accountId,
      description: data?.data.description,
      title: data?.data.title,
      url: data?.data.url,
      published: data?.data.published,
      keywords: data?.data.keywords,
      score: data?.data.score,
      matchedCases: data?.data.matchedCases,
      matchedCasesData: data?.data.matchedCasesData,
      matchedBlogs: data?.data.matchedBlogs,
      matchedBlogsData: data?.data.matchedBlogsData,
      presetId: data?.data.presetId,
      review: data?.data.review,
    };
  }, [data]);

  const [selectedCase, setSelected] = useState({
    ...feed.matchedCasesData?.reduce((acc, el) => {
      return { ...acc, [el.docId]: el.selected };
    }, {}),
  });

  const [like, setLike] = useState<string | null>(null);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const handleChangeSelected = (key: string) => {
    setSelected({...selectedCase, [key]: !selectedCase[key]});
  };

  const changeReview = (review: string) => {
    if (like === review) setLike(null);
    else setLike(review);
  };

  return (
    <div className='feed-wrapper'>
      <SideBar />
      <div className='main-wrapper' style={{width: isOpen ? 'calc(100% - 320px)' : '100%' }}>
        <StyledHeader />
        <div className='subheader'>
          <div>
            <Link to='/feed' className='nav-link'>Upwork feed</Link>
            <div className='feed-title'>{feed.title}</div>
          </div>
          <StyledButton
            preIcon='send'
            classNames='save-response'>
          Save & Generate response
          </StyledButton>
        </div>
        <div className='sections-wrapper'>
          <div className="feed-section">
            <div className='section-title'>Project info</div>
            <div className='section-info'>
              <div>
                <div className={`score ${getColor(feed.score as number)}`}>{feed.score}</div>
              </div>
              <div className='link'>
                <a
                  href={feed.url}
                  target="_blank"
                  rel="noreferrer">
                  {feed.title}
                </a>
              </div>
              <div className='date'>
                {formatDate(feed.published as string)}
              </div>
            </div>
            <div className='section-content'>
              <div className={`section-description ${!isExpand ? 'non-expanded' : ''}`}>
                {feed.description}
              </div>
              <a className='section-expand' onClick={()=>
                setIsExpand(!isExpand)
              }>
                {isExpand ? 'Collapse' : 'Expand'}
              </a>
            </div>
          </div>
          <div className="feed-section">
            <div className='section-title'>Keywords</div>
            <div className='section-info-keywords'>
              <div className='keywords-wrapper'>
                {Array.isArray(feed.keywords) && feed.keywords.map((el) =>
                  <span key={el} className='keywords'>{el}</span>)}
              </div>
              <div className='review'>
                <button className={`review-button ${like === 'like' && 'selected'}`} onClick={() => changeReview('like')}>
                  <span className='review-icon' />
                </button>
                <button className={`review-button ${like === 'dislike' && 'selected'}`} onClick={() => changeReview('dislike')}>
                  <span className='review-icon thumb-down' />
                </button>
              </div>
            </div>
          </div>
          <div className="feed-section">
            <div className='section-title'>Matched cases</div>
            <div className='section-match-cases-wrapper'>
              {Array.isArray(feed.matchedCasesData) && feed.matchedCasesData.map((el) =>
                <div key={el.docId} className='matched-case-wrapper'>
                  <MatchedCase
                    title={el.title}
                    link={el.link}
                    content={el.content}
                    infoBlock={el.infoBlock}
                  />
                  <label className='styled-checkbox'>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedCase[el.docId]}
                      onChange={() => handleChangeSelected(el.docId)}
                    />
                  </label>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedExpand;
