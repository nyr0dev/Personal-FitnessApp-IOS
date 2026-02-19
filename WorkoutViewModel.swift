import SwiftUI

struct Exercise: Identifiable, Codable {
    var id = UUID()
    let name: String
    let sets: String
    let detail: String
    var isCompleted: Bool = false
}

struct DayWorkout: Identifiable, Codable {
    var id = UUID()
    let day: String
    let title: String
    var exercises: [Exercise]
}

class WorkoutViewModel: ObservableObject {
    @Published var workouts: [DayWorkout] = []
    
    init() {
        loadProgram()
    }
    
    func loadProgram() {
        self.workouts = [
            DayWorkout(day: "Pazartesi", title: "Alt Vücut + Core", exercises: [
                Exercise(name: "Squat", sets: "4x15", detail: "Formuna dikkat et, topuklara bas."),
                Exercise(name: "Bulgarian Split Squat", sets: "3x12", detail: "Her bacak için ayrı ayrı yap."),
                Exercise(name: "Glute Bridge", sets: "4x15", detail: "Kalçanı yukarıda sıkıştır."),
                Exercise(name: "Wall Sit", sets: "3x Max", detail: "Dizlerin 90 derece olsun."),
                Exercise(name: "Plank", sets: "3x45 sn", detail: "Vücudun dümdüz kalsın."),
                Exercise(name: "Leg Raise", sets: "3x12", detail: "Bacaklarını yavaşça indir.")
            ]),
            DayWorkout(day: "Salı", title: "Üst Vücut + Core", exercises: [
                Exercise(name: "Şınav", sets: "4x Max", detail: "Göğsünü yere yaklaştır."),
                Exercise(name: "Pike Push Up", sets: "3x10", detail: "Omuzlarını odakla."),
                Exercise(name: "Sandalye Dips", sets: "3x12", detail: "Arka kolunu hisset."),
                Exercise(name: "Side Plank", sets: "3x30 sn", detail: "Her iki taraf için de yap."),
                Exercise(name: "Dead Bug", sets: "3x12", detail: "Belini yere yapıştır.")
            ]),
            DayWorkout(day: "Çarşamba", title: "Aktif Dinlenme", exercises: [
                Exercise(name: "Tempolu Yürüyüş", sets: "20-30 dk", detail: "Dışarı çık ve temiz hava al."),
                Exercise(name: "Esneme", sets: "5 dk", detail: "Tüm vücudunu rahatlat.")
            ]),
            DayWorkout(day: "Perşembe", title: "Bacak Şekillendirme", exercises: [
                Exercise(name: "Jump Squat", sets: "3x15", detail: "Patlayıcı güç kullan."),
                Exercise(name: "Reverse Lunge", sets: "3x12", detail: "Dengeni koru."),
                Exercise(name: "Tek bacak hip thrust", sets: "3x12", detail: "Kalçan yansın."),
                Exercise(name: "Calf Raise", sets: "4x20", detail: "Parmak ucunda yüksel."),
                Exercise(name: "Hollow Hold", sets: "3x30 sn", detail: "Karın kaslarını sık.")
            ]),
            DayWorkout(day: "Cuma", title: "Core Yoğun", exercises: [
                Exercise(name: "Plank", sets: "3x1 dk", detail: "Zihnini odakla."),
                Exercise(name: "Leg Raise", sets: "4x12", detail: "Alt karın odaklı."),
                Exercise(name: "Mountain climber", sets: "3x30 sn", detail: "Nabzını yükselt."),
                Exercise(name: "Russian twist", sets: "3x20", detail: "Gövdeni döndür.")
            ]),
            DayWorkout(day: "Cumartesi", title: "Full Body", exercises: [
                Exercise(name: "Squat", sets: "3x20", detail: "Yüksek hacimli tekrar."),
                Exercise(name: "Şınav", sets: "3x max", detail: "Limitlerini zorla."),
                Exercise(name: "Lunge yürüyüş", sets: "3x20 adım", detail: "Her adımda alçal."),
                Exercise(name: "Glute bridge", sets: "3x20", detail: "Kısa dinlenmelerle yap."),
                Exercise(name: "Plank", sets: "3x45 sn", detail: "Antrenmanı bitiriyoruz.")
            ]),
            DayWorkout(day: "Pazar", title: "Dinlenme", exercises: [])
        ]
    }
}
