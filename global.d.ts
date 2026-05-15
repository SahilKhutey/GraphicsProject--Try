declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useMemo: any;
  export const useCallback: any;
  export const useContext: any;
  export const createContext: any;
  export const memo: any;
  export const forwardRef: any;
  const React: any;
  export default React;
}

declare module 'react-dom' {
  const ReactDOM: any;
  export default ReactDOM;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'lucide-react' {
  export const Wind: any;
  export const Cloud: any;
  export const Trees: any;
  export const Waves: any;
  export const Zap: any;
  export const Activity: any;
  export const Settings: any;
  export const Layers: any;
  export const Globe: any;
  export const BarChart3: any;
  export const Maximize2: any;
  export const ChevronRight: any;
  export const Play: any;
  export const Pause: any;
  export const RefreshCw: any;
  export const Eye: any;
}
