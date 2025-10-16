import { Pressable, View } from 'react-native';
import { useTheme } from '../src/theme/ThemeProvider';
export default function Check({ checked, onChange }:{ checked:boolean; onChange:(v:boolean)=>void; }) {
  const t = useTheme();
  return (
    <Pressable onPress={()=>onChange(!checked)}
      style={{ width:22, height:22, borderRadius:4, borderWidth:2, borderColor:t.colors.violet, alignItems:'center', justifyContent:'center' }}>
      {checked ? <View style={{ width:12, height:12, borderRadius:2, backgroundColor:t.colors.emerald }} /> : null}
    </Pressable>
  );
}
