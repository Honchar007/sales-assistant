import * as React from 'react';

// component
import IconButton from './IconButton';

// models
type PresetList = {
  name: string,
  url: string,
  id: string,
};

// example data
const defaultData: PresetList[] = [
  {
    name: 'IT Networking 2',
    url: 'https://www.upwork.com/ab/feed/jobs/rss&?filter',
    id: '910',
  },
  {
    name: 'IT Networking 2',
    url: 'https://www.upwork.com/ab/feed/jobs/rss&?filter',
    id: '911',
  },
  {
    name: 'IT Networking 2',
    url: 'https://www.upwork.com/ab/feed/jobs/rss&?filter',
    id: '912',
  },
  {
    name: 'IT Networking 2',
    url: 'https://www.upwork.com/ab/feed/jobs/rss&?filter',
    id: '913',
  },
  {
    name: 'IT Networking 2',
    url: 'https://www.upwork.com/ab/feed/jobs/rss&?filter',
    id: '914',
  },
  {
    name: 'IT Networking 2',
    url: 'https://www.upwork.com/ab/feed/jobs/rss&?filter',
    id: '915',
  },
  {
    name: 'IT Networking 2',
    url: 'https://www.upwork.com/ab/feed/jobs/rss&?filter',
    id: '916',
  },
];

export default function PresetList() {
  const [data, setData] = React.useState(() => [...defaultData]);

  React.useEffect(()=> {
    setData([...defaultData]);
  }, []);

  return (
    <div className='preset-list'>
      {data && data.map((preset) =>
        <div key={preset.id} className='preset'>
          <div className='preset-name' onClick={()=>console.log(preset.name)}>{preset.name}</div>
          <a className='preset-link' onClick={()=>window.open(preset.url)}>{preset.url}</a>
          <IconButton icon='edit' onClick={() => console.log(preset.id)} classNames='preset-icon'/>
          <IconButton icon='remove' onClick={() => console.log(preset.id)} classNames='preset-icon'/>
        </div>
      )}
    </div>
  );
}
