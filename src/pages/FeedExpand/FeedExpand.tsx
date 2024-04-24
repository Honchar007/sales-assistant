import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// components
import SideBar from '../../components/SideBar';
import { StyledHeader } from '../../components/StyledHeader';
import MatchedCase from './components/MatchedCase';

// store
import { useAppSelector } from '../../redux/hook';
import { selectIsOpen } from '../../redux/sidebarSlicer';
import { useGetFeedByIdQuery } from '../../redux/rtk/feeds.api';

// utils
import { getColor } from '../../utils/get-color';
import { formatDate } from '../../utils/format-date';

// models
import { ReviewType } from '../../submodules/public-common/enums/upwork-feed/review-type.enum';
import MatchedBlog from './components/MatchedBlog';

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

  const [selectedCase, setSelectedCase] = useState({
    ...feed.matchedCasesData?.reduce((acc, el) => {
      return { ...acc, [el.docId]: el.selected };
    }, {}),
  });

  const [selectedBlogs, setSelectedBlogs] = useState({
    ...feed.matchedBlogsData?.reduce((acc, el) => {
      return { ...acc, [el.docId]: el.selected };
    }, {}),
  });

  const [like, setLike] = useState<ReviewType | undefined>(feed.review?.type);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  useEffect(() => {
    setLike(feed.review?.type);
  }, [feed.review?.type]);

  const handleChangeSelectedCases = (key: string) => {
    setSelectedCase({...selectedCase, [key]: !selectedCase[key]});
  };

  const handleChangeSelectedBlogs = (key: string) => {
    setSelectedBlogs({...selectedBlogs, [key]: !selectedBlogs[key]});
  };

  const changeReview = (review: string) => {
    if (like === review) setLike(undefined);
    else setLike(ReviewType[review]);
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
        </div>
        <div className='sections-wrapper'>
          <div className='feed-section'>
            <div className='section-title'>Project info</div>
            <div className='section-info'>
              <div>
                <div className={`score ${getColor(feed.score as number)}`}>{feed.score}</div>
              </div>
              <div className='link'>
                <a
                  href={feed.url}
                  target='_blank'
                  rel='noreferrer'>
                  {feed.title}
                </a>
              </div>
              <div className='date'>
                {formatDate(feed.published as string)}
              </div>
            </div>
            <div className='section-content'>
              <div className={`section-description ${!isExpand ? 'non-expanded' : ''}`}>
                <ReactMarkdown>{feed.description}</ReactMarkdown>
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
                <button
                  className={`review-button ${like === ReviewType.Like && 'selected'}`}
                  onClick={() => changeReview(ReviewType.Like)}
                >
                  <span className='review-icon' />
                </button>
                <button
                  className={`review-button ${like === ReviewType.Dislike && 'selected'}`}
                  onClick={() => changeReview(ReviewType.Dislike)}
                >
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
                      onChange={() => handleChangeSelectedCases(el.docId)}
                    />
                  </label>
                </div>
              )}
            </div>

          </div>
          <div className="feed-section">
            <div className='section-title'>Matched blogs</div>
            <div className='section-match-cases-wrapper'>
              {Array.isArray(feed.matchedBlogsData) && feed.matchedBlogsData.map((el) =>
                <div key={el.docId} className='matched-case-wrapper'>
                  <MatchedBlog
                    title={el.title}
                    link={el.link}
                    infoBlock={el.infoBlock}
                  />
                  <label className='styled-checkbox'>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedCase[el.docId]}
                      onChange={() => handleChangeSelectedBlogs(el.docId)}
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
