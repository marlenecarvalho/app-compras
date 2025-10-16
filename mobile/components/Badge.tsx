import { View, Text, StyleSheet } from 'react-native';
export default function Badge({ name, color, emoji }: { name: string; color?: string; emoji?: string }) {
  const border = color || '#3f3f46';
  const symbol = emoji || '🍎';
  return (
    <View style={[s.wrap]}>
      <View style={[s.icon, { borderColor: border, backgroundColor: `${border}22` }]}> 
        <Text style={s.emoji}>{symbol}</Text>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  wrap:{},
  icon:{ width:28, height:28, borderRadius:999, borderWidth:1, alignItems:'center', justifyContent:'center' },
  emoji:{ fontSize:14, color:'#e5e7eb' }
});
