import { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../src/theme/ThemeProvider';
const UNITS = ['Un.', 'L', 'Kg'];

export default function QuantityPicker({ value, unit, onChange }:{
  value:number; unit:string; onChange:(v:number,u:string)=>void;
}) {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <View style={{ position:'relative' }}>
      <View style={{ flexDirection:'row' }}>
        <TextInput
          keyboardType="numeric"
          value={String(value)}
          onChangeText={(txt)=>onChange(Math.max(1, Number(txt||1)), unit)}
          style={[s.input, { width:64, height:44, borderColor:t.colors.violet, color:'#fff', backgroundColor:t.colors.overlay, borderTopRightRadius:0, borderBottomRightRadius:0, borderRightWidth:0 }]}
        />
        <Pressable onPress={()=>setOpen(true)} style={[s.input, { width:84, height:44, borderColor:t.colors.violet, backgroundColor:t.colors.overlay, borderTopLeftRadius:0, borderBottomLeftRadius:0, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:12 }]}>
          <Text style={{ color:'#fff' }}>{unit || 'Un.'}</Text>
          <Text style={{ color:'#fff' }}>⌄</Text>
        </Pressable>
      </View>
      <Modal visible={open} transparent animationType="fade" onRequestClose={()=>setOpen(false)}>
        <Pressable style={StyleSheet.absoluteFill} onPress={()=>setOpen(false)} />
        <View style={{ position:'absolute', right:0, top:48, width:140, borderWidth:1, borderColor:'#27272a', backgroundColor:'rgba(24,24,27,0.92)', borderRadius:12, overflow:'hidden' }}>
          <FlatList data={UNITS} keyExtractor={(u)=>u}
            renderItem={({ item }) => (
              <Pressable onPress={()=>{ onChange(value,item); setOpen(false); }} style={{ paddingHorizontal:12, paddingVertical:10 }}>
                <Text style={{ color:'#e5e7eb', fontSize:14 }}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}
const s = StyleSheet.create({ input:{ borderWidth:1, borderRadius:12, paddingHorizontal:12 }});
