import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MoreVertical } from 'lucide-react-native';
import Badge from './Badge';
import Check from './Check';
import type { Item, Category } from '../src/types';
import { useTheme } from '../src/theme/ThemeProvider';


export default function ItemRow({ item, category, onToggle, onDelete }:{
  item:Item; category?:Category; onToggle:(id:number,v:boolean)=>void; onDelete:(id:number)=>void;
}) {
  const t = useTheme();
  const sub = (() => {
    const u = (item.unidade||'').toLowerCase(), q = item.quantidade;
    if (u==='kg') return `${q} kg`;
    if (u.startsWith('un')) return `${q} ${q>1?'unidades':'unidade'}`;
    return `${q} ${item.unidade}`;
  })();
  return (
    <View style={[s.card, { borderColor:t.colors.border, backgroundColor:t.colors.card }]}>
      <View style={s.left}>
        <Check checked={!!item.comprado} onChange={(v)=>onToggle(item.id,v)} />
        <View>
          <Text style={[s.title, item.comprado ? { textDecorationLine:'line-through', color:t.colors.emerald } : { color:t.colors.text }]}>{item.nome}</Text>
          <Text style={[s.subtitle, { color:t.colors.textMuted }]}>{sub}</Text>
        </View>
      </View>
      <View style={s.right}>
        {category && <Badge name={category.nome} color={category.cor} />}
        <Pressable onPress={()=>onDelete(item.id)} style={[s.kebab, { borderColor:t.colors.border }]}>
          <MoreVertical size={18} color="#e5e7eb" />
        </Pressable>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  card:{ borderWidth:1, borderRadius:14, paddingVertical:12, paddingHorizontal:14, marginBottom:10,
         flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  left:{ flexDirection:'row', alignItems:'flex-start', gap:12 },
  right:{ flexDirection:'row', alignItems:'center', gap:8, marginLeft:12 },
  title:{ fontSize:15, fontWeight:'800' },
  subtitle:{ fontSize:12 },
  kebab:{ padding:10, borderRadius:12, borderWidth:1, backgroundColor:'#18181b' },
});
