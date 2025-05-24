import 'styled-components/native';
import { theme } from './theme/index'; // senin theme dosyan neredeyse orayı import et

type AppTheme = typeof theme;

declare module 'styled-components/native' {
    export interface DefaultTheme extends AppTheme { }
}
